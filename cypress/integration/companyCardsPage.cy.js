/// <reference types="cypress" />

import { visit } from "../fixtures/mainPage";
import mainPage from '../fixtures/mainPage.js';
const companyCardsPage = new mainPage();

describe('Company cards page', () => {
  
  beforeEach(() => {
    visit();
  });

  it('Company card dates validation', () => {
    companyCardsPage.getCompanyDates().each(($date) => {
      const dateString = $date.text().trim();
      const dateObj = new Date(dateString);
      if (isNaN(dateObj)) {
          cy.wrap($date).should('not.have.text', dateString);
      } else {
          cy.wrap($date).should('have.text', dateString);
      } 
    })
  })
  it('Company card display names validation', () => {
    companyCardsPage.getCompanyNames().each(($name) => {
        cy.wrap($name).should('have.length.greaterThan', 0).and('not.have.text', '');
    });
  })
  it('Earliest button ascending order check', () => {
    companyCardsPage.getEarliestButton().click();
    companyCardsPage.getCompanyDates().each(($date, index, $dates) => {
      cy.wrap($date).should('have.text', $dates.eq(index).text());
      if (index < $dates.length - 1) {
        const currentDate = new Date($date.text());
        const nextDate = new Date($dates.eq(index + 1).text());
        expect(currentDate).to.be.at.most(nextDate);
      }
    });
  });
  it('Latest button decending order check', () => {
    companyCardsPage.getLatestButton().click(); 
    companyCardsPage.getCompanyDates().then(($dates) => {
      const dateStrings = $dates.toArray().map((date) => date.innerText);
      const sortedDates = dateStrings.sort((a, b) => new Date(b) - new Date(a));
      for (let i = 0; i < sortedDates.length - 1; i++) {
        expect(new Date(sortedDates[i])).to.be.at.least(new Date(sortedDates[i + 1]));
      }
    });
  });
  it('Search bar check', () => {
    companyCardsPage.getSearchInput().click().type("cr");
    companyCardsPage.getCompanyDates().should("have.length", 5)
    companyCardsPage.getSearchInput().click().clear().type("Cruickshank");
    companyCardsPage.getCompanyDates().should("have.length", 3)
    companyCardsPage.getSearchInput().click().clear().type("Cruickshank2");
    companyCardsPage.getCompanyDates().should("have.length", 0)
    companyCardsPage.getSearchInput().click().clear().type("111");
    companyCardsPage.getCompanyDates().should("have.length", 0)
  });
});