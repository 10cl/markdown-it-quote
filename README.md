# markdown-it-quote

[![NPM version](https://img.shields.io/npm/v/markdown-it-quote.svg?style=flat)](https://npmjs.com/package/markdown-it-quote)

## Usage

```js
const MarkdownIt = require('markdown-it')
const makrdownQuote = require('markdown-it-quote')

const md = new MarkdownIt()
md.use(makrdownQuote)

md.render(markdownString)
```

<img src="https://raw.githubusercontent.com/SourceCodeTrace/websites/main/source/.vuepress/public/images/quote_to_html.png" width="600" alt="https://github.com/10cl/markdown-it-quote">

More details in [SourceCodeTrace Project](https://source.toscl.com)

_Note highlighted line between language name and opening curly bracket are optional._

you can apply some custom styles to gist meta, recommended:

```css
.gist-meta-quote{
  font-size:12px;padding: 10px;overflow: hidden;color: white;border-radius: 0 0 6px 6px;
}

.gist-meta-quote a{
  float: right;color: white;text-decoration: underline;
}
```

You can tweak it a bit to suit your own needs.

## More Examples
- wrap line 3125 to 3131, and highlight 3126 to 3130, link the url
````markdown
```java {3125-3131} {3129,3131} (https://github.com/10cl/fwkdev/blob/android-13.0.0_r52/dev/src/frameworks/base/services/core/java/com/android/server/am/OomAdjuster.java#3125-L3131)
        // Use current adjustment when freezing, set adjustment when unfreezing.
        if (state.getCurAdj() >= ProcessList.CACHED_APP_MIN_ADJ && !opt.isFrozen()
                && !opt.shouldNotFreeze()) {
            mCachedAppOptimizer.freezeAppAsyncLSP(app);
        } else if (state.getSetAdj() < ProcessList.CACHED_APP_MIN_ADJ) {
            mCachedAppOptimizer.unfreezeAppLSP(app, oomAdjReason);
        }
    }
```
````


- wrap line 3125 to 3131, link the url
````markdown
```java {3125-3131} (https://github.com/10cl/fwkdev/blob/android-13.0.0_r52/dev/src/frameworks/base/services/core/java/com/android/server/am/OomAdjuster.java#3125-L3131)
        // Use current adjustment when freezing, set adjustment when unfreezing.
        if (state.getCurAdj() >= ProcessList.CACHED_APP_MIN_ADJ && !opt.isFrozen()
                && !opt.shouldNotFreeze()) {
            mCachedAppOptimizer.freezeAppAsyncLSP(app);
        } else if (state.getSetAdj() < ProcessList.CACHED_APP_MIN_ADJ) {
            mCachedAppOptimizer.unfreezeAppLSP(app, oomAdjReason);
        }
    }
```
````

- just link the url
````markdown
```java (https://github.com/10cl/fwkdev/blob/android-13.0.0_r52/dev/src/frameworks/base/services/core/java/com/android/server/am/OomAdjuster.java#3125-L3131)
        // Use current adjustment when freezing, set adjustment when unfreezing.
        if (state.getCurAdj() >= ProcessList.CACHED_APP_MIN_ADJ && !opt.isFrozen()
                && !opt.shouldNotFreeze()) {
            mCachedAppOptimizer.freezeAppAsyncLSP(app);
        } else if (state.getSetAdj() < ProcessList.CACHED_APP_MIN_ADJ) {
            mCachedAppOptimizer.unfreezeAppLSP(app, oomAdjReason);
        }
    }
```
````

- highlight line 1-2
````markdown
```java {1-2}
        // Use current adjustment when freezing, set adjustment when unfreezing.
        if (state.getCurAdj() >= ProcessList.CACHED_APP_MIN_ADJ && !opt.isFrozen()
                && !opt.shouldNotFreeze()) {
            mCachedAppOptimizer.freezeAppAsyncLSP(app);
        } else if (state.getSetAdj() < ProcessList.CACHED_APP_MIN_ADJ) {
            mCachedAppOptimizer.unfreezeAppLSP(app, oomAdjReason);
        }
    }
```
````

- highlight line 3
````markdown
```java{3}
        // Use current adjustment when freezing, set adjustment when unfreezing.
        if (state.getCurAdj() >= ProcessList.CACHED_APP_MIN_ADJ && !opt.isFrozen()
                && !opt.shouldNotFreeze()) {
            mCachedAppOptimizer.freezeAppAsyncLSP(app);
        } else if (state.getSetAdj() < ProcessList.CACHED_APP_MIN_ADJ) {
            mCachedAppOptimizer.unfreezeAppLSP(app, oomAdjReason);
        }
    }
```
````

- just language
````markdown
```java
        // Use current adjustment when freezing, set adjustment when unfreezing.
        if (state.getCurAdj() >= ProcessList.CACHED_APP_MIN_ADJ && !opt.isFrozen()
                && !opt.shouldNotFreeze()) {
            mCachedAppOptimizer.freezeAppAsyncLSP(app);
        } else if (state.getSetAdj() < ProcessList.CACHED_APP_MIN_ADJ) {
            mCachedAppOptimizer.unfreezeAppLSP(app, oomAdjReason);
        }
    }
```
````

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**markdown-it-quote** © [10cl](https://github.com/10cl), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by 10cl with help from contributors ([list](https://github.com/10cl/markdown-it-quote/contributors)).

> [github.com/10cl](https://github.com/10cl) · GitHub [@10cl](https://github.com/10cl)
