import fs from 'fs';
import path from 'path';
import { BLUEPRINTS_1_TO_50 } from '../src/data/blueprints1to50';
import { BLUEPRINTS_51_TO_100 } from '../src/data/blueprints51to100';
import { BLUEPRINTS_101_TO_150 } from '../src/data/blueprints101to150';

const all = [...BLUEPRINTS_1_TO_50, ...BLUEPRINTS_51_TO_100, ...BLUEPRINTS_101_TO_150];
const target = all.filter(b => b.id >= 40 && b.id <= 150);

const CAMERA_SHOT_ROTATIONS = [
  "Low-Angle Heroic / Reverent Shot (Looking upward as golden dawn sky illuminates the character)",
  "Wide Environmental Establishing Shot (9:16 full-body framing showcasing character within historic biblical landscape)",
  "Medium-Wide Three-Quarter Framing (Waist-up capturing dynamic physical interaction with the historic environment)",
  "Side-Profile Tracking Dolly Shot (Smooth cinematic tracking following character's purposeful movement)",
  "Over-The-Shoulder Perspective View (Slow arcing reveal from panoramic horizon to character's reverent profile)",
  "Eye-Level Medium Cinematic Framing (Authentic 35mm natural depth of field and intimate historical presence)",
  "High-Angle Downward Tilt (Camera descending gently from above into sunlit courtyard or waterside)",
  "Dynamic Slow Arcing Orbit (Dramatic 45-degree cinematic camera move revealing character and expansive backdrop)"
];

function getCameraShot(id: number, character: string, location: string): string {
  const c = character.toLowerCase();
  const l = location.toLowerCase();

  if (c.includes('gate') || c.includes('prophet') || c.includes('apostle') || c.includes('shofar') || c.includes('king') || c.includes('bold')) {
    return CAMERA_SHOT_ROTATIONS[0]; // Low-angle heroic
  }
  if (l.includes('sea') || l.includes('mountain') || l.includes('desert') || l.includes('hill') || l.includes('valley') || l.includes('ridge')) {
    return CAMERA_SHOT_ROTATIONS[1]; // Wide environmental
  }
  if (c.includes('mother') || c.includes('farmer') || c.includes('harvester') || c.includes('meal') || c.includes('flour') || c.includes('water')) {
    return CAMERA_SHOT_ROTATIONS[2]; // Medium-wide 3/4
  }
  if (c.includes('traveler') || c.includes('walker') || c.includes('pilgrim') || c.includes('path') || c.includes('road')) {
    return CAMERA_SHOT_ROTATIONS[3]; // Side-profile tracking
  }
  if (c.includes('scribe') || c.includes('scroll') || c.includes('rooftop') || c.includes('starlight')) {
    return CAMERA_SHOT_ROTATIONS[4]; // Over the shoulder
  }
  if (c.includes('kneeling') || c.includes('well') || c.includes('pool') || c.includes('spring') || c.includes('fountain')) {
    return CAMERA_SHOT_ROTATIONS[6]; // High angle tilt
  }

  // Cyclic rotation to guarantee variety
  return CAMERA_SHOT_ROTATIONS[id % CAMERA_SHOT_ROTATIONS.length];
}

function getNonChestGesture(id: number, character: string, location: string, tamilText: string): string {
  const c = character.toLowerCase();
  const l = location.toLowerCase();
  const t = tamilText.toLowerCase();

  // Specific bespoke actions based on biblical activity:
  if (id === 40 || c.includes('gatekeeper')) {
    return "Hands firmly gripping and sliding the reinforced olivewood gate beam into heavy iron brackets, standing securely beside the fortified cedar doors.";
  }
  if (id === 41 || c.includes('mother') && c.includes('child')) {
    return "Gently holding a toddler's laughing hands while older children weave palm fronds in the courtyard, lifting a beaming face of maternal gratitude heavenward.";
  }
  if (id === 42 || c.includes('farmer') && l.includes('border')) {
    return "Resting a weathered, sun-bronzed hand on an ancient boundary stone, gazing across peaceful terraced wheat fields with deep shalom.";
  }
  if (id === 43 || c.includes('wheat') || c.includes('harvest')) {
    return "Cradling an armful of golden ripe wheat stalks, rubbing a grain husk between thumb and forefinger with thankful wonder.";
  }
  if (id === 44 || c.includes('prison') || c.includes('cell')) {
    return "Seated upright upon coarse stone floor, lifting unchained open palms into a single sunbeam piercing the prison grate.";
  }
  if (id === 45 || c.includes('crossroads') || c.includes('fork')) {
    return "Firmly planting a polished olivewood walking staff onto the stone path, raising the other hand outward to commit the journey into divine guidance.";
  }
  if (id === 46 || c.includes('creation') || l.includes('tabor')) {
    return "Standing upon the high mountain crest, extending both arms wide to the horizon in awe of the Almighty Creator.";
  }
  if (id === 47 || c.includes('peter') || c.includes('solomon')) {
    return "Standing tall between massive limestone columns, pointing one hand heavenward with unshakeable apostolic authority.";
  }
  if (id === 48 || c.includes('upper room') || c.includes('bread')) {
    return "Lifting a loaf of warm, freshly broken barley bread together with fellow disciples at a low wooden table in holy unity.";
  }
  if (id === 49 || c.includes('seeker') || l.includes('gethsemane')) {
    return "Kneeling among gnarled olive roots, spreading open palms outward upon the cool earth, head tilted peacefully toward the rising sun.";
  }
  if (id === 50 || c.includes('cave') || c.includes('darkness')) {
    return "Stepping out from a mountain cavern holding a glowing clay oil lamp at waist level, eyes expanding in wonder at the sunlit Sea below.";
  }
  if (id === 51 || c.includes('flour') || c.includes('oil')) {
    return "Pouring golden olive oil and coarse wheat flour into a clay bowl with unhurried contentment and domestic faith.";
  }
  if (id === 52 || c.includes('daniel') || c.includes('kingdom')) {
    return "Standing upright upon high ramparts, raising a carved ceremonial staff toward the twilight sky in proclamation of the Everlasting Dominion.";
  }
  if (id === 53 || c.includes('scribe') || c.includes('scroll')) {
    return "Holding a reed pen poised above a sacred sheepskin parchment scroll, pausing to gaze up into the star-filled heavens with reverence.";
  }
  if (id === 54 || c.includes('stars') || c.includes('infinite')) {
    return "Kneeling on rocky limestone ground, bowing forehead reverently toward the earth before looking up into the glistening Milky Way.";
  }

  // Diverse thematic gesture archetypes (Zero hand-on-chest):
  const GESTURE_ARCHETYPES = [
    "Both arms extended outward at waist height, open palms facing upward in humble receipt of divine blessing.",
    "Resting one hand upon a rugged olivewood shepherd's staff, standing with calm, unshakable dignity against the morning wind.",
    "Cupping hands to dip into cool, glistening spring water, letting clear droplets trickle freely between fingers in thanksgiving.",
    "Unfurling a coarse linen mantle and letting the mountain breeze billow the fabric as chin lifts high in fearless adoration.",
    "Kneeling on one knee upon ancient flagstones, placing both hands flat against the warm limestone in grounded reverence.",
    "Walking with purposeful, measured steps along a dusty stone pathway, opening hands outward in blessing and hospitality.",
    "Shielding eyes with one raised hand to behold the brilliant first rays of sunrise breaking through mountain crests.",
    "Holding an open parchment scroll with both hands at waist height, eyes reading the sacred promises then looking up with joy.",
    "Standing firmly planted upon bedrock, arms relaxed at sides with shoulders back, breathing deeply of the tranquil valley air.",
    "Gently touching an ancient carved stone lintel or doorframe in silent remembrance of God's covenant faithfulness.",
    "Both arms lifted high toward the sky, fingers spread wide in victorious, exultant praise for supernatural deliverance.",
    "Pouring fresh water from an earthen pitcher into a stone basin, sharing refreshment with weary pilgrims."
  ];

  return GESTURE_ARCHETYPES[id % GESTURE_ARCHETYPES.length];
}

function getExpression(id: number, tamilTitle: string, englishText: string): string {
  const t = (tamilTitle + " " + englishText).toLowerCase();

  if (t.includes('மகிழ்ச்சி') || t.includes('joy') || t.includes('பரிசுத்த') || t.includes('ஆசீர்வதிக்கிறார்')) {
    return "Radiant, beaming countenance; crinkled eyes shining with boundless spiritual joy; relaxed and grateful smile.";
  }
  if (t.includes('விடுவி') || t.includes('deliver') || t.includes('முறிக்கிற') || t.includes('இரட்சி')) {
    return "Triumphant, fearless gaze; parted lips whispering stunned praise; eyes luminous with the sudden realization of freedom.";
  }
  if (t.includes('கன்மலை') || t.includes('அரண்') || t.includes('rock') || t.includes('strong hold') || t.includes('கோட்டை')) {
    return "Steadfast, unshakable calmness; steady, fearless eyes looking out over the horizon with deep-rooted tranquility.";
  }
  if (t.includes('அறிவு') || t.includes('wisdom') || t.includes('understanding') || t.includes('சோதித்தறி')) {
    return "Contemplative, awe-filled gaze; soft brow reflecting deep understanding and holy wonder before the infinite intellect of God.";
  }
  if (t.includes('அப்பம்') || t.includes('கோதுமை') || t.includes('நன்மை') || t.includes('finest') || t.includes('wheat')) {
    return "Contented, peaceful countenance; gentle smile of deep satisfaction in divine sufficiency and abundance.";
  }
  if (t.includes('சமாதான') || t.includes('peace') || t.includes('எல்லைக')) {
    return "Serene, quiet peace across the entire face; relaxed jaw; eyes reflecting heavenly shalom without a trace of anxiety.";
  }

  const EXPRESSIONS = [
    "Warm, peaceful countenance filled with profound, unhurried thanksgiving; soft and gentle eyes reflecting golden sunlight.",
    "Awe-struck gaze with wide, luminous eyes witnessing the grandeur of divine faithfulness; quiet, reverent smile.",
    "Deep, contemplative serenity; brow smoothed of all worldly burdens; tranquil, joyful expression of unwavering trust.",
    "Vibrant, energized countenance; alert eyes shining with hope and spiritual conviction; dignified and joyful demeanor.",
    "Solemn, majestic adoration; calm eyes reflecting ancient promises fulfilled; quiet nod of praise and reverence.",
    "Humbled and deeply moved countenance; eyes glistening with grateful tears transforming into radiant victory."
  ];

  return EXPRESSIONS[id % EXPRESSIONS.length];
}

function getAtmosphere(id: number, location: string): string {
  const l = location.toLowerCase();
  if (l.includes('sunset') || l.includes('dusk') || l.includes('evening')) {
    return "Warm amber golden hour lighting, long atmospheric shadows across weathered limestone, soft evening wind.";
  }
  if (l.includes('night') || l.includes('star') || l.includes('starlight')) {
    return "Deep nocturnal cobalt sky sprinkled with brilliant celestial stars, soft flickering flame from olive-oil lamp.";
  }
  if (l.includes('dawn') || l.includes('morning') || l.includes('sunrise')) {
    return "Crisp early dawn atmosphere, dew glistening on olive leaves, first pink and gold sun rays cutting through mist.";
  }
  if (l.includes('sea') || l.includes('shore') || l.includes('lake')) {
    return "Fresh lakeside breeze carrying scent of fresh water, morning ripples catching dazzling diamond sun glints.";
  }

  const ATMOSPHERES = [
    "Warm Mediterranean sunbeams streaming through ancient stone colonnades, airborne dust motes drifting in peaceful stillness.",
    "Sweeping panoramic view of rolling Judean hills, soft breezes rustling golden grasses under an expansive azure sky.",
    "Dignified courtyard shaded by ancient olive trees, soft dappled sunlight playing across coarse linen garments.",
    "Stately biblical terrace with panoramic horizon, gentle afternoon light casting rich, authentic historical textures."
  ];

  return ATMOSPHERES[id % ATMOSPHERES.length];
}

const variations: Record<number, any> = {};

for (const b of target) {
  const cameraShot = getCameraShot(b.id, b.character, b.location);
  const physicalGesture = getNonChestGesture(b.id, b.character, b.location, b.tamilText);
  const facialExpression = getExpression(b.id, b.tamilTitle, b.englishText);
  const atmosphere = getAtmosphere(b.id, b.location);
  const theologicalMood = `Reverent adoration of the Lord celebrating "${b.englishText.replace(/\.$/, '')}" with biblical authenticity and active historical staging.`;

  variations[b.id] = {
    cameraFraming: cameraShot,
    gesturePosture: physicalGesture,
    expression: facialExpression,
    sceneAtmosphere: atmosphere,
    theologicalMood: theologicalMood
  };
}

const content = `/**
 * Curated Cinematography & Postural Variations for Shorts #40 to #150
 * 
 * Guarantees rich, varied camera framings (Wide, Low-Angle, 3/4, Side-Profile Tracking,
 * Over-the-Shoulder, High-Angle Tilt, Dynamic Arc) and 100% eliminates repetitive
 * "hand on chest" / "close-up" shot monotony.
 */

export interface VideoVariationItem {
  cameraFraming: string;
  gesturePosture: string;
  expression: string;
  sceneAtmosphere: string;
  theologicalMood: string;
}

export const VIDEO_VARIATIONS_40_TO_150: Record<number, VideoVariationItem> = ${JSON.stringify(variations, null, 2)};
`;

const targetFile = path.resolve(process.cwd(), 'src/data/videoVariations40to150.ts');
fs.writeFileSync(targetFile, content, 'utf-8');
console.log(`Successfully generated ${Object.keys(variations).length} video variations into ${targetFile}`);
