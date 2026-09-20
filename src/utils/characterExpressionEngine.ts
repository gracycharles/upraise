import { ShortsBlueprint, CharacterExpression } from '../types';

/**
 * Character Expression & Scene Inculcation Engine
 * 
 * Ensures that for every YouTube Short / Praise video:
 * 1. The character's facial micro-expressions (eyes, brow, gaze, mouth, tears, smile)
 *    directly match the theological content of the Tamil praise and Scripture.
 * 2. The character's physical gestures, posture, and emotional state are deeply
 *    inculcated directly into the 30 AD historical biblical scene.
 * 3. The video prompt explicitly guides AI video generators (Midjourney, Runway Gen-3,
 *    Luma Dream Machine, Sora, Kling) to avoid blank, static expressions and generate
 *    emotionally captivating, spiritually resonant characters.
 */

interface CuratedExpression {
  expression: string;
  gesturePosture: string;
  theologicalMood: string;
  sceneAtmosphere: string;
}

const CURATED_EXPRESSIONS: Record<number, CuratedExpression> = {
  1: { // அப்பா பிதாவே ஸ்தோத்திரம் (ரோம. 8:15)
    expression: "Glistening, tear-moistened eyes gazing upward with profound childlike gratitude; soft, peaceful brow; lips gently parted in breathless adoration.",
    gesturePosture: "Right hand pressed firmly over coarse-weave linen tunic above his heart; humble, reverent upward tilt of the chin in intimate prayer.",
    theologicalMood: "Intimate filial adoration and spiritual adoption as a child of God, overwhelmed by the Father's tender mercy.",
    sceneAtmosphere: "Golden dawn sunlight beams through ancient Jerusalem limestone arches, dust motes suspended in peaceful stillness."
  },
  2: { // அன்பின் பிதாவே ஸ்தோத்திரம் (1 யோவா. 3:1)
    expression: "Warm, radiant countenance with a serene and tender smile; crinkled eyes shining with boundless joy and deep affection.",
    gesturePosture: "Open arms extended forward in a welcoming, generous gesture as if embracing the profound love of the Father.",
    theologicalMood: "Beholding with wonder the unmatched, extravagant love bestowed by the Heavenly Father upon His beloved children.",
    sceneAtmosphere: "Sun-drenched olive grove on Mount Olivet, soft wind rustling silver-green olive leaves, warm golden backlighting."
  },
  3: { // அன்பின் குமாரனே ஸ்தோத்திரம் (கொலோ. 1:13)
    expression: "Solemn, awe-struck gaze with intense loyalty; jaw resolute yet humbled; eyes reflecting the deep crimson hues of twilight.",
    gesturePosture: "Head held high in royal honor, hand clutching a prayer shawl against his chest, standing firmly on the stony shore.",
    theologicalMood: "Reverent devotion to Jesus Christ, the Beloved Son who delivered us from the dominion of darkness into His glorious kingdom.",
    sceneAtmosphere: "Shore of the Sea of Galilee at golden hour, rippling twilight water reflecting purple and amber horizon."
  },
  4: { // அன்பின் தேவனே ஸ்தோத்திரம் (1 யோவா. 4:8)
    expression: "Deep, tranquil peace across a gentle countenance; eyes closed in quiet surrender before softly opening with moist, reverent tears.",
    gesturePosture: "Kneeling on the earthen garden ground, palms gently folded beneath her chin in heartfelt, unhurried prayer.",
    theologicalMood: "Resting completely in the holy truth that God is love itself, finding supreme solace in His divine presence.",
    sceneAtmosphere: "Terraced hillside garden in Bethany with ancient olive trees, soft afternoon sun casting long, gentle shadows."
  },
  5: { // அநாதி தேவனே ஸ்தோத்திரம் (உபா. 33:27)
    expression: "Weathered face lined with years of faith; eyes wide with ancient reverence, filled with calm assurance and steadfast shelter.",
    gesturePosture: "Standing upright against an ancient stone pillar, palms resting against the rock as if physically anchoring in the Eternal God.",
    theologicalMood: "Profound security and timeless trust in the Eternal God who is an everlasting refuge and whose eternal arms hold us.",
    sceneAtmosphere: "High rocky overlook in the Judean wilderness, expansive eternal horizons under sweeping, dramatic clouds."
  },
  6: { // அதரிசனமுள்ள தேவனே ஸ்தோத்திரம் (1 தீமோ. 1:17)
    expression: "Trembling, holy wonder; eyes searching the vast heavens with reverent humility; brows softened in contemplative mystery.",
    gesturePosture: "Head gently bowed, mantle drawn respectfully over head, hands slightly open at waist level in adoration of the Unseen King.",
    theologicalMood: "Awestruck worship of the King eternal, immortal, invisible, the only wise God who dwells in unapproachable light.",
    sceneAtmosphere: "Ancient temple courtyard colonnade at twilight, celestial stars beginning to emerge in deep cobalt sky."
  },
  7: { // அல்பா ஒமெகாவுமானவரே ஸ்தோத்திரம் (வெளி. 1:8)
    expression: "Stunned spiritual vision; eyes wide and luminous with prophetic wonder; lips parted in breathless awe of eternity.",
    gesturePosture: "One hand shielding eyes from celestial radiance, body leaning slightly forward in magnetic pull toward divine majesty.",
    theologicalMood: "Eschatological awe before the First and the Last, the Almighty Lord who was, who is, and who is to come.",
    sceneAtmosphere: "Rocky promontory on the Isle of Patmos overlooking endless ocean waves catching brilliant dawn fire."
  },
  8: { // அதிசயம் எனும் நாமமுள்ளவரே ஸ்தோத்திரம் (ஏசா. 9:6)
    expression: "Pure childlike astonishment; raised eyebrows of wonder, radiant smile of hope breaking through past sorrow; joyful wonder in the eyes.",
    gesturePosture: "Both hands lifted gently outward, head shaking slightly in wondrous disbelief at God's miraculous deeds.",
    theologicalMood: "Joyous celebration of Messiah's name: Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.",
    sceneAtmosphere: "Bethlehem hillside path at sunset, warm breeze carrying scents of cedar and wild thyme, skies streaked with gold."
  },
  9: { // அற்புதங்களை செய்பவரே ஸ்தோத்திரம் (யாத். 15:11)
    expression: "Electrified gaze of victory and deliverance; eyes shining with tears of triumph; triumphant yet deeply humbled expression.",
    gesturePosture: "Right fist gently clenched over heart, left hand raised high in thankful praise, posture upright with renewed vigor.",
    theologicalMood: "Exultant praise to the Lord who is majestic in holiness, awesome in praises, performing wonders beyond human strength.",
    sceneAtmosphere: "Shoreline of the Red Sea during evening breeze, majestic waves lapping ancient sands under an amber sky."
  },
  10: { // அசைவாடும் ஆவியானவரே ஸ்தோத்திரம் (ஆதி. 1:2)
    expression: "Deeply meditative, spirit-filled tranquility; eyelids fluttering softly, countenance glowing with inner warmth and breath of life.",
    gesturePosture: "Standing still in quiet communion, head tilted back slightly to receive the refreshing heavenly breeze, palms facing outward.",
    theologicalMood: "Intimate yieldedness to the Holy Spirit hovering with creative power, peace, and spiritual renewal over chaos.",
    sceneAtmosphere: "Quiet riverbank of the Jordan at daybreak, gentle morning mist floating over moving water with glistening ripples."
  },
  11: { // அவர் கன்மலையானவர் ஸ்தோத்திரம் (உபா. 32:4)
    expression: "Steadfast, unshakable calmness; peaceful resolve in the eyes, no fear or anxiety; grounded, dignified serenity.",
    gesturePosture: "Firm footing on solid bedrock, hand resting on a massive ancient boulder, shoulders relaxed and upright.",
    theologicalMood: "Total reliance on the Rock whose work is perfect, whose ways are justice, a God of truth without injustice.",
    sceneAtmosphere: "Craggy limestone cliffs of Masada at sunrise, golden light illuminating unbreakable stone foundations."
  },
  23: { // காலங்களையும் சமயங்களையும் மாற்றுகிறவர் (தானி. 2:21)
    expression: "Awe at the sovereign mysteries of God; thoughtful furrow of the brow giving way to calm acceptance and worshipful trust.",
    gesturePosture: "Looking up from an ancient parchment scroll toward the heavens, hand gently resting upon the open scripture.",
    theologicalMood: "Reverent submission to God who changes the times and seasons, removes kings, and sets up kings with supreme sovereignty.",
    sceneAtmosphere: "Ancient stone library alcove in Babylon/Jerusalem, candlelight flickering across worn stone walls and scrolls."
  },
  31: { // தமது வசனத்தை அனுப்பி குணமாக்குகிறார் (சங். 107:20)
    expression: "Tearful relief of healing; eyes that once bore pain now glowing with vitality and stunned gratefulness; tremulous smile.",
    gesturePosture: "Looking down at hands once withered or trembling, now steady; pressing both hands to cheeks in thankful wonder.",
    theologicalMood: "Personal physical and spiritual healing by the sent Word of the Lord, redeemed from destruction.",
    sceneAtmosphere: "Sunlit stone domestic room in Capernaum, warm light streaming through a clay-brick window onto the restored character."
  },
  32: { // அவர் அக்கிரமங்களை மன்னிக்கிறவர் (சங். 103:3)
    expression: "Overwhelming tears of contrition giving way to unburdened peace; brow unwinding from guilt; deeply relieved countenance.",
    gesturePosture: "Head deeply bowed to the ground, then slowly lifting face toward the sky as heavy spiritual burden lifts.",
    theologicalMood: "The liberation of divine forgiveness: all sins washed white as snow, restored to communion with God.",
    sceneAtmosphere: "Quiet corner of the Temple Mount, soft shadows meeting morning sunlight, symbolic of darkness banished by grace."
  },
  33: { // அவர் நோய்களையெல்லாம் குணமாக்குகிறவர் (சங். 103:3)
    expression: "Ecstatic yet reverent joy; tears streaming down radiant cheeks; wide eyes witnessing one's own miraculous restoration.",
    gesturePosture: "Standing on feet with full balance, lifting palms toward heaven, taking a deep, unrestricted breath of vitality.",
    theologicalMood: "Wholehearted thanksgiving to Jehovah Rapha who heals all our diseases and redeems life from the pit.",
    sceneAtmosphere: "Pool of Bethesda stone colonnade, sunlight breaking through the colonnades upon a leaping, thankful believer."
  },
  68: { // ஆலோசனைக் கர்த்தரே ஸ்தோத்திரம் (ஏசா. 9:6)
    expression: "Thoughtful, attentive gaze seeking wisdom; brow relaxing as divine clarity arrives; quiet nod of inner understanding and peace.",
    gesturePosture: "Seated on a stone bench, one hand holding an open scroll and the other resting thoughtfully against chin.",
    theologicalMood: "Receiving counsel from the Wonderful Counselor whose wisdom guides through every perplexing path of life.",
    sceneAtmosphere: "Solitary stone study room illuminated by warm olive-oil lamp light, tranquility of evening stillness."
  },
  69: { // ஆறுதலின் தேவனே ஸ்தோத்திரம் (ரோம. 15:5)
    expression: "Face streaked with dried tears of grief, now blossoming with unexpected deep consolation; gentle, comforting smile.",
    gesturePosture: "Holding a linen prayer shawl securely wrapped around shoulders, head resting peacefully against a cool stone wall.",
    theologicalMood: "Experiencing the God of all comfort, who comforts us in all our tribulations with tender compassion.",
    sceneAtmosphere: "Quiet garden in Bethany at twilight, gentle lavender sky, evening breeze carrying fragrance of blooming pomegranates."
  },
  149: { // உமது கிருபை பெரியது ஸ்தோத்திரம் (சங். 86:13)
    expression: "Overwhelmed, tear-filled eyes looking up with humble astonishment; trembling smile of deep deliverance; hand pressed over heart in profound awe of boundless mercy.",
    gesturePosture: "Kneeling reverently upon coarse Judean stone, one hand resting on the ground for support, head tilted upward in breathless thanksgiving.",
    theologicalMood: "Humbled by the vastness of divine mercy that has delivered his soul from the lowest depths, celebrating God's great and personal lovingkindness.",
    sceneAtmosphere: "Ancient limestone sanctuary chamber at golden hour, amber rays illuminating dust motes and highlighting tears of gratitude."
  },
  200: { // என்னை காண்கிற தேவனே ஸ்தோத்திரம் (ஆதி. 16:13)
    expression: "Stunned astonishment in solitude; trembling lips whispering in disbelief; eyes brimming with tears of no longer being forgotten.",
    gesturePosture: "Kneeling beside a solitary desert spring, trembling fingers touching the water, looking upward in breathtaking revelation.",
    theologicalMood: "The sacred cry of El Roi: 'You-Are-the-God-Who-Sees; for she said, Have I also here seen Him who sees me?'",
    sceneAtmosphere: "Arid desert wilderness of Shur at golden hour, shimmering spring water reflecting solitary tears transformed into worship."
  },
  267: { // ஒருவரில் ஒருவர் அன்பாயிருங்கள் ஸ்தோத்திரம் (யோவா. 13:34)
    expression: "Radiant, compassionate gaze with a tender and humble smile; eyes shining with self-giving affection and gentle sincerity.",
    gesturePosture: "Arms gently extended forward in welcoming fellowship, slight bow of the head reflecting Christlike servanthood.",
    theologicalMood: "Embodying Christ's new commandment to love one another with sacrificial, unconditional love.",
    sceneAtmosphere: "Upper room in Jerusalem at twilight, warm flickering candlelight casting soft amber glow on wooden table and linen robes."
  },
  293: { // ஓசன்னா, இஸ்ரவேலின் ராஜா ஸ்தோத்தரிக்கப்பட்டவர் (யோவா. 12:13)
    expression: "Exultant celebration with luminous, joyous eyes; lips parted in triumphant acclamation; face flushed with ecstatic spiritual joy.",
    gesturePosture: "Waving a lush green palm branch high overhead, standing upright with boundless enthusiasm among welcoming pilgrims.",
    theologicalMood: "Messianic triumph welcoming the King of Israel who comes in the name of the Lord with loud Hosannas.",
    sceneAtmosphere: "Jerusalem city gate road lined with ancient palms and crowds, bright sunlight reflecting off golden limestone walls."
  }
};

/**
 * Derives dynamic, context-aware character expression and scene direction
 * for any praise based on its theological themes and scriptural emotion.
 */
export function generateCharacterExpression(blueprint: ShortsBlueprint): CharacterExpression {
  if (CURATED_EXPRESSIONS[blueprint.id]) {
    const c = CURATED_EXPRESSIONS[blueprint.id];
    return {
      ...c,
      inculcatedPromptAddition: `Emotional Expression: ${c.expression} Physical Posture: ${c.gesturePosture} Atmosphere: ${c.sceneAtmosphere}`
    };
  }

  const title = blueprint.tamilTitle;
  const text = blueprint.tamilText;

  // 1. Brotherly Love, Unity, Humility, Fellowship & Service ("One Another" commands)
  if (text.includes('ஒருவர்') || text.includes('அன்பாயிருங்கள்') || text.includes('ஐக்கிய') || text.includes('சமாதான') || text.includes('மன்னியுங்கள்') || text.includes('கழுவுங்கள்') || text.includes('சுமந்து') || text.includes('தாங்கிக்')) {
    return {
      expression: "Warm, compassionate countenance overflowing with brotherly tenderness; gentle, humble smile; relaxed, welcoming expression of Christlike love.",
      gesturePosture: "Arms held slightly open or extended in gentle service, slight respectful bow of the head, embodying sacrificial love and humility.",
      theologicalMood: "Living in the unity of the Spirit, bearing one another's burdens and loving one another as Christ loved us.",
      sceneAtmosphere: "Warm, communal courtyard in ancient Galilee at twilight, soft lantern glow illuminating fellowship and peaceful community.",
      inculcatedPromptAddition: "Character has tender compassionate eyes, gentle humble smile of brotherly love, open hands of Christian fellowship and service."
    };
  }

  // 2. Boundless Mercy, Grace, Lovingkindness & Compassion
  if (title.includes('கிருபை') || title.includes('இரக்க') || title.includes('காருண்ய') || text.includes('கிருபை') || text.includes('இரக்கம்')) {
    return {
      expression: "Tears of relief glistening on a softened, comforted countenance; brow releasing all tension; lips curved in gentle, heartfelt gratitude.",
      gesturePosture: "Right hand pressed firmly against the chest over linen tunic, head bowed in humble thanksgiving before lifting peacefully toward heaven.",
      theologicalMood: "Overwhelmed by God's abundant mercy and steadfast covenant love that endures forever, delivering the soul from despair.",
      sceneAtmosphere: "Serene morning mist on the Mount of Olives, soft dawn light washing over ancient olive groves in peaceful stillness.",
      inculcatedPromptAddition: "Character has tear-glistening eyes filled with gratitude for great mercy, relaxed brow, hand pressed over heart in adoration."
    };
  }

  // 3. Compassion, Comfort, Tears & Forgiveness
  if (title.includes('மன்னி') || title.includes('ஆறுதல்') || title.includes('கண்ணீர்') || title.includes('தேற்று') || text.includes('மன்னி') || text.includes('ஆறுதல்') || text.includes('கண்ணீரை')) {
    return {
      expression: "Tears of sorrow transforming into profound consolation; gentle, reassuring smile; eyes reflecting inner restoration and peace.",
      gesturePosture: "Holding a linen prayer shawl securely wrapped around shoulders, head resting peacefully against a cool stone wall before looking upward.",
      theologicalMood: "Experiencing deep spiritual healing, forgiveness, and the tender consolation of God who wipes away all tears.",
      sceneAtmosphere: "Soft twilight ambiance in a secluded 30 AD stone garden, warm golden lamp light gently illuminating peaceful features.",
      inculcatedPromptAddition: "Character has tearful, deeply comforted eyes, relaxed brow of spiritual forgiveness, hand over heart in heartfelt prayer."
    };
  }

  // 4. Provision, Multiplication, Abundance & Health
  if (title.includes('அப்பம்') || title.includes('ஐசுவரிய') || title.includes('சம்பூரண') || title.includes('ஔஷதம்') || text.includes('அப்பம்') || text.includes('ஐசுவரிய') || text.includes('சம்பூரண')) {
    return {
      expression: "Wide eyes filled with joyful wonder at divine provision; lips whispering blessings; glowing countenance of satisfaction and health.",
      gesturePosture: "Both hands cupped and held outward in receiving and sharing, head slightly lifted toward heaven in grateful praise.",
      theologicalMood: "Beholding God's miraculous multiplication and boundless provision, trusting the Lord who supplies every need according to His riches.",
      sceneAtmosphere: "Sunlit Galilean hillside overlooking the shimmering sea, fresh breeze rustling green barley fields under bright skies.",
      inculcatedPromptAddition: "Character shows joyful amazement at divine provision, bright smiling eyes, hands cupped in grateful receipt and blessing."
    };
  }

  // 5. Majestic Awe, Almighty Power, Holiness & Sovereignty
  if (title.includes('சர்வவல்ல') || title.includes('பரிசுத்த') || title.includes('மகத்துவ') || title.includes('ராஜா') || title.includes('அதிசய') || title.includes('அற்புத') || title.includes('அக்கினி') || text.includes('வல்லமை') || text.includes('பெரியவர்')) {
    return {
      expression: "Awe-struck gaze with wide, luminous eyes reflecting holy wonder; breath caught in reverent amazement; solemn, trembling adoration.",
      gesturePosture: "Kneeling on one knee upon ancient flagstones, palms held outward in total reverence and surrender to the Supreme King.",
      theologicalMood: "Trembling before the transcendent holiness and majestic glory of the Almighty God of Israel.",
      sceneAtmosphere: "Dramatic golden light rays cutting through ancient stone colonnades, atmospheric dust particles suspended in ethereal stillness.",
      inculcatedPromptAddition: "Character exhibits breathtaking holy awe, wide luminous eyes filled with wonder, reverent posture kneeling on stone flagstones."
    };
  }

  // 6. Healing, Deliverance, Salvation & Restoration
  if (title.includes('குணமாக்கு') || title.includes('விடுவி') || title.includes('இரட்சி') || title.includes('பரிகாரி') || title.includes('பெலன்') || text.includes('குணமாக்கு') || text.includes('விடுவிக்கிறார்')) {
    return {
      expression: "Radiant joy breaking through past sorrow; tear-streaked cheeks illuminated by a joyful, triumphant smile; eyes shining with renewed life.",
      gesturePosture: "Standing tall with upright posture, both hands lifted gracefully toward heaven in unbounded praise for deliverance.",
      theologicalMood: "Uncontainable joy of physical and spiritual restoration, celebrating victory and miraculous deliverance.",
      sceneAtmosphere: "Brilliant morning sun bursting over Galilean hills, fresh morning breeze gently billowing linen tunic and head mantle.",
      inculcatedPromptAddition: "Character shows triumphant joy, radiant smile, glistening tears of physical deliverance, arms raised in victory."
    };
  }

  // 7. Refuge, Shepherd, Rock, Guidance & Defense
  if (title.includes('கன்மலை') || title.includes('அடைக்கலம்') || title.includes('மேய்ப்ப') || title.includes('கேடக') || title.includes('கோட்டை') || title.includes('வழி') || text.includes('கன்மலை') || text.includes('மேய்ப்')) {
    return {
      expression: "Deep, resolute calmness; serene and tranquil gaze looking steadily into the horizon; unshakable confidence and peaceful inner rest.",
      gesturePosture: "Standing firmly anchored against an ancient rock or holding a wooden shepherd's staff, shoulders relaxed, breathing peacefully.",
      theologicalMood: "Steadfast faith resting secure under the shadow of the Almighty, trusting Jehovah as Shepherd and Rock.",
      sceneAtmosphere: "Pastoral Galilean hillside at sunset, soft golden grass swaying in twilight breeze under a calm lavender and amber sky.",
      inculcatedPromptAddition: "Character has calm, resolute eyes of unwavering trust, peaceful steady posture leaning on shepherd staff, tranquil demeanor."
    };
  }

  // 8. Intimate Fatherly Love, Praise & Adoration (Default)
  return {
    expression: "Deeply reverent, loving countenance; soft, warm gaze filled with filial intimacy; eyes moist with genuine devotional love.",
    gesturePosture: "Right hand placed over heart above coarse linen tunic, head tilted slightly upward in intimate conversation with God.",
    theologicalMood: "Intimate communion with God, expressing childlike affection and heartfelt thanksgiving for His goodness.",
    sceneAtmosphere: "Authentic 30 AD stone courtyard, morning sunlight casting warm amber hues across ancient limestone architecture.",
    inculcatedPromptAddition: "Character shows intimate loving reverence, moist eyes filled with gratitude, hand placed over heart in prayerful devotion."
  };
}

/**
 * Weaves the character expression and scene direction seamlessly into the video prompt.
 */
export function buildInculcatedVideoPrompt(blueprint: ShortsBlueprint, expr: CharacterExpression): string {
  return `A cinematic 8k video set in 30 AD Judea/Galilee (9:16 vertical, 10s native). Historical biblical character: ${blueprint.character}. 
SCENE & DIRECTION:
- Facial Expression: ${expr.expression}
- Posture & Gesture: ${expr.gesturePosture}
- Setting & Atmosphere: In ${blueprint.location}. ${expr.sceneAtmosphere}
- Emotional & Theological Context: ${expr.theologicalMood}
Historical authenticity: 1st-century coarse-weave linen garments, natural skin textures, shallow depth of field, dramatic cinematic lighting, photorealistic.`;
}
