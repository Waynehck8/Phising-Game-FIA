const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// SVG template for creating mock website screenshots
function createWebsiteSVG(config) {
    return `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                .browser-bar { fill: #333; }
                .browser-text { fill: white; font-family: Arial, sans-serif; font-size: 12px; }
                .header { fill: ${config.headerColor}; }
                .header-text { fill: ${config.headerTextColor}; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; }
                .logo-text { fill: ${config.logoColor}; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; }
                .content-bg { fill: ${config.contentBg}; }
                .content-text { fill: #333; font-family: Arial, sans-serif; font-size: 16px; }
                .button { fill: ${config.buttonColor}; }
                .button-text { fill: white; font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; }
                .warning { fill: #ff4444; font-family: Arial, sans-serif; font-size: 12px; }
                .suspicious { fill: #ff6666; }
            </style>
        </defs>
        
        <!-- Browser bar -->
        <rect class="browser-bar" width="800" height="30"/>
        <text class="browser-text" x="10" y="20">${config.url}</text>
        <circle cx="760" cy="15" r="5" fill="#ff5f56"/>
        <circle cx="775" cy="15" r="5" fill="#ffbd2e"/>
        <circle cx="790" cy="15" r="5" fill="#27ca3f"/>
        
        <!-- Header -->
        <rect class="header" y="30" width="800" height="80"/>
        <text class="logo-text" x="20" y="60">${config.siteName}</text>
        
        <!-- Search bar (if applicable) -->
        ${config.hasSearch ? `
        <rect x="200" y="45" width="400" height="30" fill="white" stroke="#ddd"/>
        <text x="210" y="65" class="content-text" font-size="12px">Search...</text>
        <rect x="580" y="45" width="60" height="30" class="button"/>
        <text x="600" y="65" class="button-text" font-size="12px">🔍</text>
        ` : ''}
        
        <!-- Navigation -->
        <rect y="110" width="800" height="40" fill="${config.navColor}"/>
        ${config.navItems.map((item, i) => 
            `<text x="${50 + i * 100}" y="135" class="header-text" font-size="12px">${item}</text>`
        ).join('')}
        
        <!-- Main content area -->
        <rect class="content-bg" y="150" width="800" height="450"/>
        
        <!-- Content elements -->
        ${config.contentElements.map((element, i) => {
            const y = 180 + (i * 60);
            if (element.type === 'text') {
                return `<text x="50" y="${y}" class="content-text">${element.content}</text>`;
            } else if (element.type === 'button') {
                return `
                    <rect x="50" y="${y - 15}" width="150" height="30" class="button" rx="5"/>
                    <text x="125" y="${y + 5}" class="button-text" text-anchor="middle">${element.content}</text>
                `;
            } else if (element.type === 'warning' && config.isPhishing) {
                return `<text x="50" y="${y}" class="warning">${element.content}</text>`;
            }
            return '';
        }).join('')}
        
        <!-- Phishing indicators (only for phishing sites) -->
        ${config.isPhishing ? `
            <!-- Suspicious URL indicator -->
            <rect x="10" y="5" width="200" height="20" class="suspicious" opacity="0.3"/>
            
            <!-- Typos or suspicious elements -->
            ${config.phishingIndicators.map((indicator, i) => 
                `<text x="${indicator.x}" y="${indicator.y}" class="warning" font-size="10px">${indicator.text}</text>`
            ).join('')}
        ` : ''}
    </svg>`;
}

// Website configurations
const websites = [
    // Real websites
    {
        filename: 'amazon-real.svg',
        isPhishing: false,
        url: 'amazon.in',
        siteName: 'amazon.in',
        headerColor: '#232f3e',
        headerTextColor: 'white',
        logoColor: 'white',
        contentBg: '#ffffff',
        buttonColor: '#febd69',
        navColor: '#37475a',
        hasSearch: true,
        navItems: ['All', 'Fresh', 'Mobiles', 'Prime', 'Electronics'],
        contentElements: [
            { type: 'text', content: 'Great Indian Festival - Up to 80% off' },
            { type: 'button', content: 'Shop Now' },
            { type: 'text', content: 'Top Deals on Electronics' },
            { type: 'text', content: 'Free delivery on orders above ₹499' }
        ],
        phishingIndicators: []
    },
    {
        filename: 'facebook-real.svg',
        isPhishing: false,
        url: 'facebook.com',
        siteName: 'facebook',
        headerColor: '#f0f2f5',
        headerTextColor: '#1877f2',
        logoColor: '#1877f2',
        contentBg: '#f0f2f5',
        buttonColor: '#1877f2',
        navColor: '#f0f2f5',
        hasSearch: false,
        navItems: [],
        contentElements: [
            { type: 'text', content: 'Connect with friends and the world around you on Facebook.' },
            { type: 'text', content: 'Email or phone number' },
            { type: 'text', content: 'Password' },
            { type: 'button', content: 'Log In' },
            { type: 'text', content: 'Forgotten password?' }
        ],
        phishingIndicators: []
    },
    {
        filename: 'google-real.svg',
        isPhishing: false,
        url: 'google.com',
        siteName: 'Google',
        headerColor: '#ffffff',
        headerTextColor: '#333',
        logoColor: '#4285f4',
        contentBg: '#ffffff',
        buttonColor: '#f8f9fa',
        navColor: '#ffffff',
        hasSearch: true,
        navItems: ['All', 'Images', 'Videos', 'News', 'Shopping'],
        contentElements: [
            { type: 'text', content: 'Search the world\'s information' },
            { type: 'button', content: 'Google Search' },
            { type: 'button', content: 'I\'m Feeling Lucky' }
        ],
        phishingIndicators: []
    },
    {
        filename: 'apple-real.svg',
        isPhishing: false,
        url: 'apple.com',
        siteName: 'Apple',
        headerColor: '#000000',
        headerTextColor: 'white',
        logoColor: 'white',
        contentBg: '#ffffff',
        buttonColor: '#0071e3',
        navColor: '#000000',
        hasSearch: false,
        navItems: ['Mac', 'iPad', 'iPhone', 'Watch', 'AirPods'],
        contentElements: [
            { type: 'text', content: 'iPhone 15 Pro' },
            { type: 'text', content: 'Titanium. So strong. So light. So Pro.' },
            { type: 'button', content: 'Learn more' },
            { type: 'button', content: 'Buy' }
        ],
        phishingIndicators: []
    },
    {
        filename: 'twitter-real.svg',
        isPhishing: false,
        url: 'twitter.com',
        siteName: 'Twitter',
        headerColor: '#1da1f2',
        headerTextColor: 'white',
        logoColor: 'white',
        contentBg: '#ffffff',
        buttonColor: '#1da1f2',
        navColor: '#1da1f2',
        hasSearch: true,
        navItems: ['Home', 'Explore', 'Notifications', 'Messages'],
        contentElements: [
            { type: 'text', content: 'What\'s happening?' },
            { type: 'button', content: 'Tweet' },
            { type: 'text', content: 'Trending in India' },
            { type: 'text', content: '#Technology' }
        ],
        phishingIndicators: []
    },

    // Phishing websites (with subtle indicators)
    {
        filename: 'amazon-phishing.svg',
        isPhishing: true,
        url: 'amazon-security.net',  // Suspicious domain
        siteName: 'amazon.in',
        headerColor: '#232f3e',
        headerTextColor: 'white',
        logoColor: 'white',
        contentBg: '#ffffff',
        buttonColor: '#febd69',
        navColor: '#37475a',
        hasSearch: true,
        navItems: ['All', 'Fresh', 'Mobiles', 'Prime', 'Electronics'],
        contentElements: [
            { type: 'warning', content: 'URGENT: Your account has been suspended!' },
            { type: 'text', content: 'Verify your account immediately to avoid closure' },
            { type: 'button', content: 'Verify Now' },
            { type: 'warning', content: 'Click within 24 hours or lose access forever!' }
        ],
        phishingIndicators: [
            { x: 15, y: 18, text: 'Suspicious domain!' },
            { x: 400, y: 200, text: 'Urgent language' },
            { x: 400, y: 280, text: 'Pressure tactics' }
        ]
    },
    {
        filename: 'facebook-phishing.svg',
        isPhishing: true,
        url: 'facebook-security.com',  // Wrong domain
        siteName: 'facebook',
        headerColor: '#f0f2f5',
        headerTextColor: '#1877f2',
        logoColor: '#1877f2',
        contentBg: '#f0f2f5',
        buttonColor: '#1877f2',
        navColor: '#f0f2f5',
        hasSearch: false,
        navItems: [],
        contentElements: [
            { type: 'warning', content: 'Security Alert: Unusual login detected!' },
            { type: 'text', content: 'Someone tried to access your account from unknown device' },
            { type: 'text', content: 'Enter your password to secure your account:' },
            { type: 'button', content: 'Secure Account' },
            { type: 'warning', content: 'Act now to prevent account theft!' }
        ],
        phishingIndicators: [
            { x: 15, y: 18, text: 'Wrong domain!' },
            { x: 400, y: 200, text: 'Fear tactics' },
            { x: 400, y: 320, text: 'Urgency pressure' }
        ]
    },
    {
        filename: 'google-phishing.svg',
        isPhishing: true,
        url: 'google-verify.net',  // Suspicious domain
        siteName: 'Google',
        headerColor: '#ffffff',
        headerTextColor: '#333',
        logoColor: '#4285f4',
        contentBg: '#ffffff',
        buttonColor: '#f8f9fa',
        navColor: '#ffffff',
        hasSearch: false,
        navItems: [],
        contentElements: [
            { type: 'warning', content: 'Account Verification Required' },
            { type: 'text', content: 'Your Google account needs immediate verification' },
            { type: 'text', content: 'Enter your password to continue:' },
            { type: 'button', content: 'Verify Account' },
            { type: 'warning', content: 'Failure to verify will result in account suspension' }
        ],
        phishingIndicators: [
            { x: 15, y: 18, text: 'Fake domain!' },
            { x: 400, y: 200, text: 'Fake verification' },
            { x: 400, y: 320, text: 'Threat language' }
        ]
    },
    {
        filename: 'apple-phishing.svg',
        isPhishing: true,
        url: 'apple-support.net',  // Wrong domain
        siteName: 'Apple',
        headerColor: '#000000',
        headerTextColor: 'white',
        logoColor: 'white',
        contentBg: '#ffffff',
        buttonColor: '#0071e3',
        navColor: '#000000',
        hasSearch: false,
        navItems: ['Mac', 'iPad', 'iPhone', 'Watch', 'AirPods'],
        contentElements: [
            { type: 'warning', content: 'Apple ID Security Alert' },
            { type: 'text', content: 'Suspicious activity detected on your Apple ID' },
            { type: 'text', content: 'Verify your identity to prevent account lock' },
            { type: 'button', content: 'Verify Apple ID' },
            { type: 'warning', content: 'Account will be locked in 2 hours if not verified' }
        ],
        phishingIndicators: [
            { x: 15, y: 18, text: 'Suspicious domain!' },
            { x: 400, y: 200, text: 'Fake security alert' },
            { x: 400, y: 320, text: 'Time pressure' }
        ]
    },
    {
        filename: 'twitter-phishing.svg',
        isPhishing: true,
        url: 'twitter-verify.com',  // Wrong domain
        siteName: 'Twitter',
        headerColor: '#1da1f2',
        headerTextColor: 'white',
        logoColor: 'white',
        contentBg: '#ffffff',
        buttonColor: '#1da1f2',
        navColor: '#1da1f2',
        hasSearch: false,
        navItems: [],
        contentElements: [
            { type: 'warning', content: 'Account Verification Required' },
            { type: 'text', content: 'Your Twitter account needs verification for blue checkmark' },
            { type: 'text', content: 'Enter your credentials to get verified:' },
            { type: 'button', content: 'Get Verified' },
            { type: 'warning', content: 'Limited time offer - verify now!' }
        ],
        phishingIndicators: [
            { x: 15, y: 18, text: 'Fake domain!' },
            { x: 400, y: 200, text: 'Fake verification offer' },
            { x: 400, y: 320, text: 'False urgency' }
        ]
    }
];

// Generate SVG files
websites.forEach(config => {
    const svgContent = createWebsiteSVG(config);
    const filePath = path.join(imagesDir, config.filename);
    fs.writeFileSync(filePath, svgContent);
    console.log(`Generated: ${config.filename}`);
});

console.log(`\nGenerated ${websites.length} website images in ${imagesDir}`);
console.log('Real websites: 5');
console.log('Phishing websites: 5');
