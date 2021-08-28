import { sanitizeHtml } from './sanitizer';
import twemoji from 'twemoji';
import { ITheme, OgImage } from '..';
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: Partial<ITheme>) {
	const {
		publicBackgroundColor,
		publicPrimaryTextColor,
		publicSecondaryTextColor,
	} = theme;

	return `
    body {
        background: ${publicBackgroundColor};
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }
    code:before, code:after {
        content: '\`';
    }
    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }
    .logo {
        margin: 0 75px;
    }
    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }
    .spacer {
        margin: 150px;
    }
    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: 3em;
        font-style: normal;
        color: ${publicPrimaryTextColor};
        line-height: 1.8;
    }
    .sub-heading {
        font-family: 'Inter', sans-serif;
        font-size: 1.5em;
        font-style: normal;
        color: ${publicSecondaryTextColor};
        line-height: 1.8;
    }
    `;
}

export function getHtml(ogImage: OgImage) {
	const { theme, heading, subHeading } = ogImage;

	return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Static Template</title>
            <style>
                body {
                    margin: 0;
                    display: flex;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                        "Helvetica Neue", sans-serif;
                }
                .container {
                    height: 630px;
                    width: 1200px;
                    background: ${theme.publicBackgroundColor ?? 'white'};
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                }
    
                h1 {
                    font-size: 5em;
                    font-weight: 800;
                    color: ${theme.publicPrimaryTextColor ?? 'black'};
                }
                h4 {
                    font-size: 3em;
                    color: ${theme.publicSecondaryTextColor ?? 'black'};
                }
    
                .branding {
                    color: #4346de;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${heading ?? ''}</h1>
                <h4>${subHeading ?? ''}</h4>
                <span
                    >Built with <span class="branding">NoCodeLetters ✨</span></span
                >
            </div>
        </body>
    </html>
    `;
}
