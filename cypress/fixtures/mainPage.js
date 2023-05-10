/// <reference types="cypress" />

export function visit() {
    cy.visit('http://localhost:3000/');
}
//Page object
class mainPage{
    getCompanyDates(){
        return cy.get('[data-testid="date"]');
    }
    getCompanyNames(){
        return cy.get('h2');
    }
    getEarliestButton(){
        return cy.get('[data-testid="earliest-button"]').should('be.visible').and('contain', 'earliest');
    }
    getLatestButton(){
        return cy.get('[data-testid="latest-button"]').should('be.visible').and('contain', 'latest');
    }
    getSearchInput(){
        return cy.get('[data-testid="search-bar"]').should('be.visible').and('contain', 'Search');;
    }
}
export default mainPage