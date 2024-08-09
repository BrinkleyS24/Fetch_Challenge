describe('Find the fake Gold Bar', () => {
    it('should find the fake gold bar', () => {
        cy.visit('http://sdetchallenge.fetch.com/');

        // Function decodes the special chars in the result button.
        const decodeHtml = (html) => {
            const textArea = document.createElement('textArea');
            textArea.innerHTML = html;
            return textArea.value;
        };

        // Simulates the action of weighing two sets of bars and returns the result.
        const weighBars = (leftBars, rightBars) => {
            leftBars.forEach((bar, index) => {
                cy.get(`#left_${index}`).clear().type(bar.toString());
            });
            rightBars.forEach((bar, index) => {
                cy.get(`#right_${index}`).clear().type(bar.toString());
            });

            return cy.get('#weigh').click().wait(3000).then(() => {
                return cy.get('.result .button').first().invoke('html').then((innerHTML) => {
                    const trimmedText = innerHTML.trim();
                    const decodedResult = decodeHtml(trimmedText);
                    return decodedResult;
                });
            });
        };

          // Function to reset scale
          const resetScale  = () => {
            cy.contains('button', 'Reset').click(); 
        };

        const findFakeBar = () => {
            const weighings = [];

            // First Weighing 
            weighBars([0, 1, 2], [3, 4, 5]).then(result => {
                weighings.push({ left: [0, 1, 2], right: [3, 4, 5], result });
                let fakeGroup;

                if (result === '<') {
                    fakeGroup = [0, 1, 2];  // Left side is lighter
                } else if (result === '>') {
                    fakeGroup = [3, 4, 5];  // Right side is lighter
                } else if (result === '=') {
                    fakeGroup = [6, 7, 8];  // Groups 0-2 and 3-5 are equal, so fake is in 6-8
                } else {
                    throw new Error('Unexpected weighing result: ' + result);
                }

                resetScale();

                // Second Weighing
                weighBars([fakeGroup[0]], [fakeGroup[1]]).then(result => {
                    weighings.push({ left: [fakeGroup[0]], right: [fakeGroup[1]], result });
                    let fakeBar;

                    if (result === '<') {
                        fakeBar = fakeGroup[0];  // Left side is lighter, fake is here
                    } else if (result === '>') {
                        fakeBar = fakeGroup[1];  // Right side is lighter, fake is here
                    } else if (result === '=') {
                        fakeBar = fakeGroup[2];  // Both sides are equal, fake is the unweighed bar
                    } else {
                        console.log('Unexpected weighing result:', result);
                        throw new Error('Unexpected weighing result: ' + result);
                    }

                    cy.on('window:alert', (alertText) => {
                        expect(alertText).to.equal('Yay! You find it!');
                        console.log('Alert message:', alertText);
                    });

                    cy.get(`#coin_${fakeBar}`).click().then(() => {
                        console.log('Number of weighings:', weighings.length);
                        console.log('Weighings:', weighings);
                    });
                });
            });
        };

        findFakeBar();
    });
});
