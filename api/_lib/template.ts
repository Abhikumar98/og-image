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
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="spacer">
            <div class="heading">${emojify(sanitizeHtml(heading))}
            </div>
            <div class="sub-heading">${emojify(sanitizeHtml(subHeading))}
            </div>
        </div>
    </body>
</html>`;
}
