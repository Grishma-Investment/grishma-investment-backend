import nodemailer from "nodemailer";
import "dotenv/config";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendMail = async ({type, payload}) => {
    let _subject;
    let _html;

    switch (type) {
        case 1:
            _subject = "Newsletter Subscription";
            _html = html_type_1({ payload });
            break;
        case 2:
            _subject = "Newsletter";
            _html = html_type_2({ payload });
            break;
        default:
            break;
    }

    let mailOptions = {
        from: `"Grishma Investment" <${process.env.GMAIL_USER}>`,
        to: payload.email,
        subject: _subject,
        html: _html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

function html_type_1({ payload }) {
    return `

<div>
    <div>
        <div>Dear Subscriber,</div>
        <br />
        <div>Thank you for subscribing to <strong>Grishma Investment's</strong> newsletter! We're thrilled to have you on board.</div>
        <br />
        <div>As a subscriber, you’ll be the first to receive our latest insights on the world of <strong>investment, business trends, technology innovations, and much more</strong>. Our goal is to keep you informed and ahead of the curve with valuable articles and updates that matter to you.</div>
        <br />
        <div>Stay tuned for:</div>
        <div>
            <div>- <strong>Exclusive updates</strong> on market trends and economic forecasts.</div>
            <div>- In-depth <strong>investment strategies</strong> and tips.</div>
            <div>- <strong>Exciting news</strong> from the world of business, technology, and economy.</div>
        </div>
        <br />
        <div>We promise to respect your inbox, only sending you what’s relevant and useful.</div>
        <div>If you ever have any questions or feedback, don’t hesitate to reach out to us. We’re here to help!</div>
        <div>Welcome aboard, and thanks again for subscribing.</div>
        <br />
        <div>Warm regards, <br> <strong>Grishma Investment</strong></div>
    </div>
    <div>
        <br />
        <div>If you wish to unsubscribe from our newsletter, you can <a href="#">click here</a>.</div>
        <div>Contact us: <a href="mailto:contact@grishmainvestment.com">contact@grishmainvestment.com</a> | Visit us at: <a href="${process.env.CLIENT_IP}" target="_blank">www.grishmainvestment.com</a></div>
    </div>
</div>

    `;
}

function html_type_2({ payload }) {
    return `

<div>
    <div>
        <div>Hello Subscriber,</div>
        <br />
        <div>We just published a new article on our website: <strong>${payload.title}</strong>!</div>
        <br />
        <div>Here's a quick preview of what you’ll find:
        <br/>
        <i>"${payload.content}"</i>
        </div>
        <br />
        <div>Want to read more? Click here to read the full article: <a href="${process.env.CLIENT_IP}/article/${payload.id}">Link</a></div>
        <br />
        <div>Stay tuned for more updates, and thank you for being a part of our community!</div>
    </div>
    <br />
    <div>
        <div>Warm regards, <br> <strong>Grishma Investment</strong></div>
    </div>
</div>

    `;
}

export default sendMail;
