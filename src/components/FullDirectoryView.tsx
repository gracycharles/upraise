import React, { useState } from 'react';
import { PraiseItem, ShortsBlueprint } from '../types';
import { ALL_PRAISES } from '../data/tamildata';
import { CheckCircle2, Sparkles, ArrowRight, BookOpen, Search, Video, Hash, Copy, Check } from 'lucide-react';
import { 
  generateDynamicBlueprint, 
  formatVideoGenerationOnlyText, 
  formatYouTubeOnlyText,
  getEnglishTitleOnly,
  getTamilPraiseWithRef,
  getFormattedYouTubeDescription,
  getScriptureVerificationText
} from '../utils/blueprintFormatter';

interface FullDirectoryViewProps {
  verifiedBlueprints: ShortsBlueprint[];
  onSelectBlueprint: (blueprint: ShortsBlueprint) => void;
}

export const FullDirectoryView: React.FC<FullDirectoryViewProps> = ({
  verifiedBlueprints,
  onSelectBlueprint,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(48);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const verifiedMap = new Map<number, ShortsBlueprint>();
  verifiedBlueprints.forEach(b => verifiedMap.set(b.id, b));

  const copyItemText = (e: React.MouseEvent, text: string, key: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Extract unique categories (Tamil vowels / consonants)
  const categories = Array.from(new Set(ALL_PRAISES.map(p => p.category).filter(Boolean))) as string[];

  const filteredItems = ALL_PRAISES.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = 
      item.text.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.reference.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.id.toString() === filterQuery.trim();
    return matchesCategory && matchesQuery;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  const handleItemClick = (item: PraiseItem) => {
    if (verifiedMap.has(item.id)) {
      onSelectBlueprint(verifiedMap.get(item.id)!);
    } else {
      // Dynamic blueprint for remaining praises (101-1000)
      const dynamic = generateDynamicBlueprint(item);
      onSelectBlueprint(dynamic);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      
      {/* Top Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm sm:text-base font-bold text-stone-100 font-serif">
            1000 Praises Directory
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-medium flex items-center gap-1.5 text-[11px]">
            <CheckCircle2 className="w-3 h-3" />
            1-{verifiedBlueprints.length} Verified
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 font-medium text-[11px]">
            1000 Praises
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Filter by praise text, scripture reference (e.g. சங், யோவா), or #..."
            value={filterQuery}
            onChange={(e) => {
              setFilterQuery(e.target.value);
              setVisibleCount(48);
            }}
            className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Categories (Tamil Agara Letters) */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0">
          <button
            onClick={() => {
              setActiveCategory('all');
              setVisibleCount(48);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-amber-600 text-stone-950'
                : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            All (1000)
          </button>
          {categories.slice(0, 12).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(48);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-amber-600 text-stone-950'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Praises */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayedItems.map((item) => {
          const isVerified = verifiedMap.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 group ${
                isVerified 
                  ? 'bg-stone-900/90 border-stone-800 hover:border-amber-500/50 hover:bg-stone-900' 
                  : 'bg-stone-950/60 border-stone-800/60 hover:border-stone-700 hover:bg-stone-900/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-amber-400">
                    #{item.id}
                  </span>
                  {isVerified ? (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-medium text-stone-400 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Dynamic
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-stone-400 font-mono">
                  {item.reference}
                </span>
              </div>

              <p className="text-sm font-serif text-stone-200 line-clamp-2 leading-relaxed">
                {item.text}
              </p>

              <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      const bp = isVerified ? verifiedMap.get(item.id)! : generateDynamicBlueprint(item);
                      copyItemText(e, getEnglishTitleOnly(bp), `dir-eng-${item.id}`);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 transition-all"
                    title="Copy Title (English text only)"
                  >
                    {copiedKey === `dir-eng-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Title!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-emerald-400" />
                        <span>Title</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      const bp = isVerified ? verifiedMap.get(item.id)! : generateDynamicBlueprint(item);
                      copyItemText(e, getFormattedYouTubeDescription(bp), `dir-tam-${item.id}`);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 text-[10px] font-semibold border border-amber-500/30 transition-all"
                    title="Copy 3-part description (Tamil praise with ref, NKJV scripture verse, personal prayer/affirmation)"
                  >
                    {copiedKey === `dir-tam-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-400 font-bold">Copied Desc!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-400" />
                        <span>Description</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      const bp = isVerified ? verifiedMap.get(item.id)! : generateDynamicBlueprint(item);
                      copyItemText(e, getScriptureVerificationText(bp), `dir-ver-${item.id}`);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 text-[10px] font-semibold border border-teal-500/30 transition-all"
                    title="Copy theological Scripture Reference Check & Translation Verification"
                  >
                    {copiedKey === `dir-ver-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-teal-400" />
                        <span className="text-teal-400 font-bold">Copied Check!</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3 h-3 text-teal-400" />
                        <span>Verify</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      const bp = isVerified ? verifiedMap.get(item.id)! : generateDynamicBlueprint(item);
                      copyItemText(e, formatVideoGenerationOnlyText(bp), `dir-vid-${item.id}`);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-semibold border border-stone-700 transition-all"
                    title="Copy Video Generation prompt (On-Screen Text Overlay Directive + Exact Unicode)"
                  >
                    {copiedKey === `dir-vid-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-3 h-3 text-amber-400" />
                        <span>Video Gen</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      const bp = isVerified ? verifiedMap.get(item.id)! : generateDynamicBlueprint(item);
                      copyItemText(e, bp.seo.tags.join(', '), `dir-tags-${item.id}`);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 text-[10px] font-semibold border border-purple-500/30 transition-all"
                    title={`Copy Tags (CSV): ${isVerified ? verifiedMap.get(item.id)!.seo.tags.join(', ') : 'Tags'}`}
                  >
                    {copiedKey === `dir-tags-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Tags!</span>
                      </>
                    ) : (
                      <>
                        <Hash className="w-3 h-3 text-purple-400" />
                        <span>Tags</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      const bp = isVerified ? verifiedMap.get(item.id)! : generateDynamicBlueprint(item);
                      copyItemText(e, formatYouTubeOnlyText(bp), `dir-yt-${item.id}`);
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-semibold border border-stone-700 transition-all"
                    title="Copy YouTube SEO alone (Title, Description, Tags CSV, Hashtags CSV)"
                  >
                    {copiedKey === `dir-yt-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Hash className="w-3 h-3 text-stone-400" />
                        <span>YouTube</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-stone-400 group-hover:text-amber-400 transition-colors">
                  <span>View Card</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filteredItems.length && (
        <div className="flex justify-center pt-2 pb-6">
          <button
            onClick={() => setVisibleCount(prev => prev + 48)}
            className="px-6 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-amber-400 hover:text-amber-300 font-medium text-xs border border-stone-700/80 transition-all shadow-md flex items-center gap-2"
          >
            <span>Load More Praises ({filteredItems.length - visibleCount} remaining)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-stone-500 text-sm">
          No praises found matching your filter criteria.
        </div>
      )}

    </div>
  );
};
