import{o as n,c as s,a}from"./app.19948c05.js";const t='{"title":"Introduction","description":"","frontmatter":{},"headers":[{"level":2,"title":"Why?","slug":"why"},{"level":2,"title":"Install","slug":"install"},{"level":2,"title":"Usage","slug":"usage"}],"relativePath":"guide/index.md","lastUpdated":1622956885314}',p={},e=a('<h1 id="introduction"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h1><p>几个简单的基于 Vue 3 和 ECharts 5 的图表组件。</p><h2 id="why"><a class="header-anchor" href="#why" aria-hidden="true">#</a> Why?</h2><p>在使用 ECharts 画一些简单的图表(例如柱状图、折线图、饼图等等)时，经常需要去查找配置，做重复的工作。 所以针对一些常见的图表做了几个 Vue 组件，意在减少样板代码的编写，快速实现简单的图表。</p><h2 id="install"><a class="header-anchor" href="#install" aria-hidden="true">#</a> Install</h2><div class="language-bash"><pre><code><span class="token comment"># npm</span>\n<span class="token function">npm</span> <span class="token function">install</span> @yangss/vue-echarts\n<span class="token comment"># yarn</span>\n<span class="token function">yarn</span> <span class="token function">add</span> @yangss/vue-echarts\n</code></pre></div><h2 id="usage"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><p>全局注册</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>\n<span class="token keyword">import</span> VueECharts <span class="token keyword">from</span> <span class="token string">&#39;@yangss/vue-charts&#39;</span>\n\n<span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueECharts<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>\n</code></pre></div><p>按需引入</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> BaseChart<span class="token punctuation">,</span> LineBarChart <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@yangss/vue-echarts&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  components<span class="token operator">:</span> <span class="token punctuation">{</span>\n    BaseChart<span class="token punctuation">,</span>\n    GridChart\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',11);p.render=function(a,t,p,o,c,r){return n(),s("div",null,[e])};export default p;export{t as __pageData};
