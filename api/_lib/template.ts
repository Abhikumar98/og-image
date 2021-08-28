import { OgImage } from "..";

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
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                        "Helvetica Neue", sans-serif;
                    background: ${theme.publicBackgroundColor || 'white'};
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    height:100%;
                    width: 100%;
                    padding: 4rem;
                }
    
                h1 {
                    margin-top: 2rem
                    font-size: 5em;
                    font-weight: 800;
                    margin-bottom: 0;
                    color: ${theme.publicPrimaryTextColor || 'black'};
                }
                h4 {
                    font-size: 3em;
                    color: ${theme.publicSecondaryTextColor || 'black'};
                }
                .branding {
                    color: ${theme.publicSecondaryTextColor || 'black'};
                }
    
                .branding {
                    color: #4346de;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${heading || ''}</h1>
                <h4>${subHeading || ''}</h4>
                <span
                    >Built with NoCodeLetters</span>
            </div>
        </body>
    </html>
    `;
}
