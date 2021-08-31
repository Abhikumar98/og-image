import { parse } from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import { getScreenshot } from './_lib/chromium';
import { getHtml } from './_lib/template';

export class ITheme {
	publicPrimaryColor: string = '#4346DE';
	publicButtonTextColor: string = '#ffffff';
	publicSecondaryColor: string = '#f1f4f5';
	publicPrimaryTextColor: string = '#094067';
	publicSecondaryTextColor: string = '#5f6c7b';
	publicBackgroundColor: string = '#ffffff';
	publicBorderColor: string = '#d1d5da';
	publicHeadingFont: string = 'Helvetica';
	publicParagraphFont: string = 'Helvetica';
}

export interface OgImage {
	readonly heading: string;
	readonly subHeading: string;
    readonly theme: Partial<ITheme>;
    readonly twitter?: string
    readonly name?: string
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {

        const {  query } = parse(req.url || '/', true);
    const { heading,
        subHeading,
        publicPrimaryTextColor,
        publicSecondaryTextColor,
        publicBackgroundColor, twitter, name } = (query || {});
    
        const ogData: OgImage = {
            heading: heading ? String(heading) : "",
            subHeading: subHeading ? String(subHeading) : "",
            theme: {
                publicPrimaryTextColor: publicPrimaryTextColor ? String(publicPrimaryTextColor) : "",
                publicSecondaryTextColor: publicSecondaryTextColor ? String(publicSecondaryTextColor) : "",
                publicBackgroundColor: publicBackgroundColor ? String(publicBackgroundColor) : "",
            },
            twitter: !!twitter?.length && typeof twitter === "string" ? String(twitter) : '',
            name: !!name?.length && typeof name === "string" ? String(name) : '',

        };
    
        const html = getHtml(ogData);
        // if (true) {
        //     res.setHeader('Content-Type', 'text/html');
        //     res.end(html);
        //     return;
        // }
        const  fileType  = 'png';
        const file = await getScreenshot(html, fileType, false);
        res.statusCode = 200;
        res.setHeader('Content-Type', `image/${fileType}`);
        res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
        console.error(e);
    }
}
