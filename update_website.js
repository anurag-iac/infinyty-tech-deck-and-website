const fs = require('fs');
const cheerio = require('cheerio');

const deckHtml = fs.readFileSync('deck.html', 'utf-8');
const $deck = cheerio.load(deckHtml);

// 1. UPDATE ABOUT.HTML
let aboutHtml = fs.readFileSync('about.html', 'utf-8');
let $about = cheerio.load(aboutHtml);

// Remove stacked logo and tagline
$about('.hero-logo-wrap').remove();
$about('.page-hero p.tagline').filter((i, el) => $about(el).text().includes('Leadership')).remove();

// Get unified pedigree from deck
const pedigree = $deck('.team-unified-pedigree').parent().html();
// Wait, .team-unified-pedigree is inside a container, let's just grab the element itself
const pedigreeHtml = $deck.html($deck('.team-unified-pedigree'));

// Get stats row from deck
const statsRowHtml = $deck.html($deck('.stats-row'));

// Update team cards in about.html to match deck.html
$about('.team-card').each((i, el) => {
    const $el = $about(el);
    const name = $el.find('h3 a').text().trim();
    // find corresponding deck card
    let deckCardHtml = '';
    $deck('.team-card').each((j, deckEl) => {
        if ($deck(deckEl).find('.team-leader-name').text().includes(name)) {
            deckCardHtml = $deck(deckEl).find('.team-card-header').parent().html();
        }
    });
    
    if (deckCardHtml) {
        // Keep the bio paragraphs from about.html
        const bioParas = $el.find('p').filter((idx, pEl) => !$about(pEl).find('strong').length).map((idx, pEl) => $about.html(pEl)).get().join('\n');
        
        // Replace innerHTML with deck header + bio paras
        const headerHtml = cheerio.load(deckCardHtml)('.team-card-header').parent().html();
        // deckCardHtml contains the whole card, let's just grab the header
        const justHeader = cheerio.load(deckCardHtml)('.team-card-header').parent().html();
        $el.html(cheerio.load(deckCardHtml)('.team-card-header').parent().html() || deckCardHtml); // this replaces the whole content, let's be more precise
    }
});

// A better way for team cards:
// The deck has the nice header.
$about('.team-card').each((i, el) => {
    const $card = $about(el);
    const isAayush = $card.html().includes('Aayush');
    const isAditi = $card.html().includes('Aditi');

    let newHeader = '';
    if (isAayush) {
        newHeader = `
          <div class="team-card-header">
            <div class="team-leader-left">
              <div class="team-avatar-circle">AM</div>
              <div class="team-name-group">
                <span class="role-pill">Founder</span>
                <h3 class="team-leader-name">
                  Aayush Mahendru
                  <a href="https://www.linkedin.com/in/aayushmahendru/" target="_blank" class="team-linkedin-btn" aria-label="LinkedIn Profile">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                </h3>
              </div>
            </div>
            <div class="team-alma-badge">
              <img src="assets/logo-cornell.png" alt="Cornell University" class="cornell-seal-img">
              <span>Cornell Alumnus</span>
            </div>
          </div>
        `;
    } else if (isAditi) {
        newHeader = `
          <div class="team-card-header">
            <div class="team-leader-left">
              <div class="team-avatar-circle">AV</div>
              <div class="team-name-group">
                <span class="role-pill">Co-Founder</span>
                <h3 class="team-leader-name">
                  Aditi Vad
                  <a href="https://www.linkedin.com/in/aditivad/" target="_blank" class="team-linkedin-btn" aria-label="LinkedIn Profile">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                </h3>
              </div>
            </div>
            <div class="team-alma-badge">
              <img src="assets/logo-cornell.png" alt="Cornell University" class="cornell-seal-img">
              <span>Cornell Alumnus</span>
            </div>
          </div>
        `;
        $card.addClass('card-aditi');
    }

    if (newHeader) {
        $card.find('.team-header').remove();
        $card.find('p:contains("Founder")').remove(); // remove old role text
        $card.prepend(newHeader);
    }
});

// Append pedigree and stats to the section containing team-card
$about('.team-card').closest('.section').append(pedigreeHtml);
$about('.team-card').closest('.section').append(statsRowHtml);

fs.writeFileSync('about.html', $about.html());

// 2. UPDATE INDEX.HTML
let indexHtml = fs.readFileSync('index.html', 'utf-8');
let $index = cheerio.load(indexHtml);

// Remove client logos strip
$index('.home-clients-section').remove();

// Get the Engagement Grid from deck (Slide 9)
// Find the deck engagement grid (with 3 columns)
let engagementGridHtml = $deck('.deck-engagement-grid').parent().html();
// Make sure it uses class home-engagement-grid if it's deck-engagement-grid
engagementGridHtml = engagementGridHtml.replace(/deck-engagement-grid/g, 'home-engagement-grid');

// Replace engagement models in index.html
// Find section with "Flexible Engagement Models"
$index('.section-title:contains("Flexible Engagement Models")').closest('.section').find('.grid-2').replaceWith(engagementGridHtml);

fs.writeFileSync('index.html', $index.html());

// 3. UPDATE SERVICES.HTML
let servicesHtml = fs.readFileSync('services.html', 'utf-8');
let $services = cheerio.load(servicesHtml);

// Find section with "Engagement Models"
$services('.section-title:contains("Engagement Models")').closest('.section').find('.grid-2').replaceWith(engagementGridHtml);

fs.writeFileSync('services.html', $services.html());

console.log("Website updated successfully.");
