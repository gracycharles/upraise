import { ShortsBlueprint, PraiseItem } from '../types';
import { ALL_PRAISES } from '../data/tamildata';
import { CANONICAL_300_PRAISES } from '../data/canonical300';

/**
 * Concise English Title Engine
 * 
 * Generates concise, punchy, meaningful English praise titles starting with:
 * "Praise to You, [Concise Title]"
 * 
 * Examples:
 * - "Praise to You, Abba, Father"
 * - "Praise to You, Who Has Blessed Your Children Within You"
 * - "Praise to You, Whose Dominion Endures to the End"
 * - "Praise to You, Who Heals by His Word"
 */

// Curated concise titles for Blueprints 1 to 300 (Strictly grounded in Scripture and Tamil praise)
export const CONCISE_TITLES_300: Record<number, string> = {
  1: "Abba, Father",
  2: "Father of Love",
  3: "Son of His Love",
  4: "God of Love",
  5: "The Eternal God",
  6: "The Invisible God",
  7: "The Alpha and Omega",
  8: "Whose Name is Wonderful",
  9: "Who Works Wonders",
  10: "The Hovering Spirit",
  11: "The Rock",
  12: "Excellent in Justice",
  13: "The Great God",
  14: "Righteous and Upright",
  15: "Whose Work is Perfect",
  16: "Who Dwells on High",
  17: "Wonderful in Counsel",
  18: "Mighty in Power and Abundant in Justice",
  19: "From His Mouth Come Knowledge",
  20: "Who is Before All Things",
  21: "Who Spoke and It Was Done",
  22: "God of Truth",
  23: "Who Changes the Times and the Seasons",
  24: "Who Will Not Always Strive",
  25: "Who Calls the Stars All by Name",
  26: "Whose Arm Shall Rule for Him",
  27: "Our Sustainer",
  28: "Who Despises No One",
  29: "Glorious in Triumph",
  30: "Lover of Righteousness",
  31: "Who Heals by His Word",
  32: "Who Forgives All Iniquities",
  33: "Who Heals All Diseases",
  34: "Who Crowns with Lovingkindness",
  35: "Who Grants Heart Desires",
  36: "Who Fulfills Wise Counsel",
  37: "Helper in Temptation",
  38: "Water from the Rock",
  39: "Springs in the Desert",
  40: "Who Strengthens the Bars of Your Gates",
  41: "Who Has Blessed Your Children Within You",
  42: "Who Makes Peace in Your Borders",
  43: "Who Fills You with the Finest Wheat",
  44: "Who Does Not Forsake His Saints",
  45: "Who Shall Bring It to Pass",
  46: "Through Whom Are All Things",
  47: "Nor is There Salvation in Any Other",
  48: "Head of the Body, the Church",
  49: "Blessed Are Those Who Seek Him",
  50: "Who Gives the Treasures of Darkness",
  51: "There is No Want to Those Who Fear Him",
  52: "Whose Kingdom Shall Not Be Destroyed",
  53: "Whose Dominion Endures to the End",
  54: "Whose Understanding is Infinite",
  55: "Whose Mercies Are Great",
  56: "Whose Glory is Above the Heavens",
  57: "Whose Truth Endures to All Generations",
  58: "Whose Greatness is Unsearchable",
  59: "Whose Anger is But for a Moment",
  60: "In Whose Favor is Life",
  61: "Whose Beauty is Exceeding Great",
  62: "Whose Goodness is Exceeding Great",
  63: "Whose Compassions Never Fail",
  64: "By Whose Stripes You Were Healed",
  65: "Father of Spirits",
  66: "The Beginning and the End",
  67: "Beloved of My Soul",
  68: "Wonderful Counselor",
  69: "God of All Comfort and Patience",
  70: "The Word from the Beginning",
  71: "God of Abraham",
  72: "The Sovereign Lord God",
  73: "Who Caused an East Wind to Blow",
  74: "My Support in the Day of Calamity",
  75: "Who Strengthens with Might in the Inner Man",
  76: "Who Blessed Us with Every Spiritual Blessing",
  77: "Who Satisfies with the Fullness of Your House",
  78: "Who Delivers in Trouble and Honors",
  79: "Who Does Great Things Past Finding Out",
  80: "Lord, You Are Good and Ready to Forgive",
  81: "Who Delivers When We Call in Trouble",
  82: "Lord, Full of Compassion and Gracious",
  83: "The Lord God is My Strength",
  84: "To the Lord Belong Mercy and Forgiveness",
  85: "Keeping Mercy for Thousands of Generations",
  86: "Showing Lovingkindness to Thousands",
  87: "Keeping Covenant for a Thousand Generations",
  88: "Keeping Mercy for a Thousand Generations",
  89: "Blessed Name of Jesus",
  90: "Horn of My Salvation",
  91: "Captain of Our Salvation",
  92: "Rock of Our Salvation",
  93: "God of Our Salvation",
  94: "Immanuel — God With Us",
  95: "Father of Our Lord Jesus Christ",
  96: "One Lord Jesus Christ",
  97: "Jesus Christ is the Same Yesterday",
  98: "The One Who Is",
  99: "I AM WHO I AM",
  100: "Who Has the Sharp Two-Edged Sword",
  101: "Who Cuts in Pieces the Bars of Iron",
  102: "Who Tests the Heart",
  103: "Who Restores Double Blessings",
  104: "A Stronghold in the Day of Trouble",
  105: "God of Israel",
  106: "The Holy One of Israel",
  107: "Shepherd of Israel",
  108: "Ruler in Israel",
  109: "King of Israel",
  110: "The Strength of Israel",
  111: "Who is Like the Dew to Israel",
  112: "Pleased to Bless Israel",
  113: "Behold, I Make All Things New",
  114: "Who Who Keeps Israel Shall Neither Slumber Nor Sleep",
  115: "The Lamb of God Who Takes Away the Sin of the World",
  116: "Behold, I Send an Angel Before You",
  117: "Behold, I Am for You and Will Turn to You",
  118: "Lo",
  119: "Who Inscribed Us on the Palms of Your Hands",
  120: "Happy is the Man Whom God Corrects",
  121: "The Lord's Hand is Not Shortened",
  122: "Thus Shall the Man Be Blessed Who Fears the Lord",
  123: "Behold, I Will Plead Your Cause",
  124: "Behold",
  125: "Behold",
  126: "Behold, I Am Coming Quickly",
  127: "Rod from the Stem of Jesse",
  128: "God of Isaac",
  129: "Who Purges with Hyssop",
  130: "The Fear of Isaac",
  131: "Who Gives Grace According to the Measure of Christ's Gift",
  132: "Faithful God",
  133: "The Risen Lord",
  134: "Light of the World",
  135: "Savior of the World",
  136: "The Spirit Who Gives Life",
  137: "Who Dwells on High",
  138: "Who Brought Me Up Out of the Miry Clay",
  139: "Near to All Who Call Upon You in Truth",
  140: "Who Fills Us with the Finest of Wheat",
  141: "Be Patient in Tribulation",
  142: "It Shall Be Well with You",
  143: "No Weapon Formed Against You Shall Prosper",
  144: "For I Have Redeemed You",
  145: "For I Will Surely Deliver You",
  146: "I Will Bless Those Who Bless You",
  147: "Your Name is a Strong Tower",
  148: "Your Gentleness Has Made Me Great",
  149: "Great is Your Mercy",
  150: "Great is Your Faithfulness",
  151: "Your Throne is Established of Old",
  152: "Your Years Will Have No End",
  153: "Your Testimonies Are Very Sure",
  154: "Your Mercy Holds Me Up",
  155: "Your Paths Overflow with Abundance",
  156: "Do Not Cast Me Away from Your Presence",
  157: "Your Rod and Your Staff Comfort Me",
  158: "You Shall Eat the Labor of Your Hands",
  159: "The Lord Shall Preserve Your Going Out",
  160: "Who Will Bless Your Bread and Your Water",
  161: "The Days of Your Mourning Shall Be Ended",
  162: "Your Work Shall Be Rewarded",
  163: "Great Shall Be the Peace of Your Children",
  164: "All Your Children Shall Be Taught by the Lord",
  165: "I Will Pour My Spirit Upon Your Descendants",
  166: "I Will Pour My Blessing on Your Offspring",
  167: "Who Will Not Allow Your Foot to Slip",
  168: "Every One of Your Righteous Judgments Endures Forever",
  169: "Your Right Hand Holds Me Up",
  170: "Your Gentleness Has Made Me Great",
  171: "Your Comforts Delight My Soul",
  172: "In Your Presence is Fullness of Joy",
  173: "Your Tent Shall Be in Peace",
  174: "You Have Given Me the Shield of Your Salvation",
  175: "In Your Favor Our Horn is Exalted",
  176: "Remember Your Tender Mercies",
  177: "Your Law is My Delight",
  178: "Great Peace Have Those Who Love Your Law",
  179: "Your Word is a Lamp to My Feet",
  180: "Your Word is a Light to My Path",
  181: "Your Word Has Given Me Life",
  182: "Spring of Water",
  183: "Who Broke Open the Fountain and the Flood",
  184: "Ointment Poured Forth",
  185: "Brought Forth When There Were No Fountains",
  186: "Who Makes His Ministers a Flame of Fire",
  187: "Who Has Compassion on His Servants",
  188: "Who Has Pleasure in the Prosperity of His Servant",
  189: "Who Confirms the Word of His Servant",
  190: "Whose Servants Shall Sing for Joy of Heart",
  191: "Who Reveals His Secret to His Servants",
  192: "Almighty God, El Shaddai",
  193: "The Lord God of Elijah",
  194: "Jealous God",
  195: "Our Lord is Above All Gods",
  196: "One Father of Us All",
  197: "Who Fills All in All",
  198: "Father Who Made Me",
  199: "Father Who Bought Me",
  200: "The God Who Sees Me",
  201: "Father Who Established Me",
  202: "Who Cares for Me",
  203: "Christ Who Strengthens Me",
  204: "Who Alone Makes Me Dwell in Safety",
  205: "Who Brought Me Out into a Broad Place",
  206: "The One Who Lifts Up My Head",
  207: "My Times Are in Your Hand",
  208: "Who Delivered My Eyes from Tears",
  209: "The Lord My God Who Enlightens My Darkness",
  210: "Who Turned My Mourning into Dancing",
  211: "Your Eyes Saw My Substance",
  212: "My Grace is Sufficient for You",
  213: "Who Has Not Turned Away My Prayer",
  214: "My Words Will By No Means Pass Away",
  215: "If You Ask Anything in My Name",
  216: "Who Looks on Him Who Trembles at My Word",
  217: "My Presence Will Go with You",
  218: "By My God I Can Leap Over a Wall",
  219: "You Number My Wanderings",
  220: "Who Puts My Tears into Your Bottle",
  221: "The Needy Shall Not Always Be Forgotten",
  222: "Who Lifts the Needy Out of the Ash Heap",
  223: "For the Lord Hears the Poor",
  224: "Who Maintains Justice for the Poor",
  225: "Who Sets the Poor on High",
  226: "Who Seats the Poor with Princes",
  227: "The True Light Which Gives Light to Every Man",
  228: "Who Caused the Wall of Jericho to Fall Down Flat",
  229: "Who Does Wonders Without Number",
  230: "For He Performs What is Appointed for Me",
  231: "God Who Performs All Things for Me",
  232: "Who Binds Up the Broken",
  233: "Always Having All Sufficiency in All Things",
  234: "The One Who Comes to Me I Will by No Means Cast Out",
  235: "Whom He Predestined, These He Also Called",
  236: "Blessed and Only Potentate",
  237: "A Strength to the Poor",
  238: "This Poor Man Cried Out",
  239: "Defend the Poor and Fatherless",
  240: "Who Causes Showers to Come Down in Their Season",
  241: "Who Walks in the Midst of the Seven Golden Lampstands",
  242: "Who Holds the Seven Stars in His Right Hand",
  243: "A Word Spoken in Due Season",
  244: "Humble Yourselves That He May Exalt You in Due Time",
  245: "Being Like-Minded, Having the Same Love",
  246: "The Same Lord Over All is Rich to All Who Call Upon Him",
  247: "God Who Supplies All Your Need According to His Riches",
  248: "Both Riches and Honor Come from You",
  249: "Riches and Honor Are with Me",
  250: "Who Who Gives You Power to Get Wealth",
  251: "Who Multiplied Five Loaves",
  252: "Who Who Hastens to Be Rich Will Not Go Unpunished",
  253: "Incomparable Lord, Glorious in Holiness",
  254: "The Only True God",
  255: "God Our Savior, Who Alone is Wise",
  256: "One Shepherd Over All",
  257: "Who Gives Liberally and Without Reproach",
  258: "Who Alone Has Immortality, Dwelling in Unapproachable Light",
  259: "Who Covers Yourself with Light as with a Garment",
  260: "The Hills from Whence Comes My Help",
  261: "To Him Who Alone Does Great Wonders",
  262: "As One Whom His Mother Comforts",
  263: "Who Who Opens and No One Shuts",
  264: "Who Who Shuts and No One Opens",
  265: "Who Executes Righteousness",
  266: "Repay No One Evil for Evil",
  267: "Love One Another as I Have Loved You",
  268: "Be Kindly Affectionate to One Another",
  269: "Bear One Another's Burdens",
  270: "You Also Ought to Wash One Another's Feet",
  271: "Comfort One Another with These Words",
  272: "Let Us Not Provoke One Another",
  273: "Let Us Not Judge One Another Anymore",
  274: "Beware Lest You Be Consumed by One Another",
  275: "Be Hospitable to One Another Without Grumbling",
  276: "Bearing with One Another",
  277: "Greet One Another with a Kiss of Love",
  278: "Individually Members of One Another",
  279: "Exhorting One Another",
  280: "Forgiving One Another",
  281: "Submitting to One Another in the Fear of God",
  282: "Let Us Not Envy One Another",
  283: "Do Not Speak Evil of One Another",
  284: "Men",
  285: "Confess Your Trespasses to One Another",
  286: "Be Kind to One Another, Tenderhearted",
  287: "Have Peace with One Another",
  288: "We Have Fellowship with One Another",
  289: "Who Rules with a Mighty Hand",
  290: "Remember the Sabbath Day, to Keep It Holy",
  291: "Who Brought Out Your People by Your Outstretched Arm",
  292: "Praise Him with Loud Cymbals",
  293: "Hosanna! Blessed is the King of Israel Who Comes in the Name of the Lord",
  294: "Healing Medicines",
  295: "A Faithful Ambassador Brings Health",
  296: "The Tongue of the Wise Promotes Health",
  297: "A Merry Heart Does Good, Like Medicine",
  298: "Great is the Lord",
  299: "For the Righteous Lord Loves Righteousness",
  300: "Therefore Let the Lord Be Judge",
};

/**
 * Meaningfully condenses any English praise text into a concise, punchy title.
 */
export function condenseEnglishPraise(rawText: string, id?: number): string {
  if (id && CONCISE_TITLES_300[id]) {
    return `Praise to You, ${CONCISE_TITLES_300[id]}`;
  }

  let text = (rawText || '').trim();

  // Strip existing praise prefixes
  text = text.replace(/^Praise (be )?to You,?\s*/i, '');
  text = text.replace(/^Praise the Lord,? (who|for)?\s*/i, '');
  text = text.replace(/^Praise (God|Jesus),?\s*/i, '');
  text = text.replace(/\.$/, '').trim();

  // If text has quotes from scripture like 'Lo, I Am with You Always...'
  const quoteMatch = text.match(/['"]([^'"]+)['"]/);
  if (quoteMatch && quoteMatch[1]) {
    text = quoteMatch[1].trim();
  }

  // Remove clumsy third person phrasing
  text = text
    .replace(/^He is (the )?/i, '$1')
    .replace(/^He /i, 'Who ')
    .replace(/^His /i, 'Whose ')
    .replace(/^Who Said, /i, '')
    .replace(/ is He$/i, '')
    .replace(/^A God of /i, 'God of ');

  // Clean up punctuation & leading quotes
  text = text.replace(/^['"]+|['"]+$/g, '').trim();

  // Trim long subordinate clauses
  if (text.length > 42) {
    if (text.includes(',')) {
      text = text.split(',')[0].trim();
    } else if (text.includes(' and ')) {
      text = text.split(' and ')[0].trim();
    } else if (text.includes(' that ')) {
      text = text.split(' that ')[0].trim();
    } else if (text.includes(' who ')) {
      text = text.split(' who ')[0].trim();
    }
  }

  // Ensure first character is uppercase
  if (text.length > 0) {
    text = text.charAt(0).toUpperCase() + text.slice(1);
  }

  return `Praise to You, ${text}`;
}

/**
 * Resolves the concise English title for any Blueprint or Praise item.
 * Guarantees a concise, meaningful title: "Praise to You, [Title]"
 */
export function getConciseEnglishTitle(
  item: ShortsBlueprint | PraiseItem | { id: number; englishText?: string; tamilTitle?: string },
  fallbackId?: number
): string {
  const id = typeof item === 'object' && item && 'id' in item ? item.id : fallbackId || 0;

  // 1. Primary Authority: Curated Scriptural concise titles grounded in Canonical 300
  if (id && CONCISE_TITLES_300[id]) {
    return `Praise to You, ${CONCISE_TITLES_300[id]}`;
  }

  // 2. Canonical 300 Praises lookup
  if (id && CANONICAL_300_PRAISES[id]?.praiseTitle) {
    return condenseEnglishPraise(CANONICAL_300_PRAISES[id].praiseTitle, id);
  }

  // 3. Try extracting from subtitles / englishText
  if (typeof item === 'object' && item) {
    const b = item as Partial<ShortsBlueprint>;
    if (b.subtitles?.line2English) {
      return condenseEnglishPraise(b.subtitles.line2English, id);
    }
    if (b.englishText) {
      return condenseEnglishPraise(b.englishText, id);
    }
  }

  // 4. Look up in ALL_PRAISES if available
  if (id) {
    const found = ALL_PRAISES.find(p => p.id === id);
    if (found) {
      // Create concise translation from clean Tamil title
      const cleanTamil = found.text.replace(/ ஸ்தோத்திரம்\.?$/, '').trim();
      return `Praise to You, ${cleanTamil}`;
    }
  }

  return 'Praise to You, O Lord';
}
