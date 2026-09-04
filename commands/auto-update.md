---
description: Pull the latest EGC repo changes and reinstall the current managed targets.
disable-model-invocation: true
---

# Auto Update

Update EGC from its upstream repo and regenerate the current context's managed install using the original install-state request.

## Usage

```bash
# Preview the update without mutating anything
EGC_ROOT="${GEMINI_PLUGIN_ROOT:-$(node -e "var r=(function(){var p=require('path'),f=require('fs'),o=require('os');var e=process.env.GEMINI_PLUGIN_ROOT;if(e&&e.trim())return e.trim();var d=p.join(o.homedir(),'.gemini');function L(x){try{return require(p.join(x,'scripts','lib','resolve-ecc-root')).resolveEccRoot({probe:p.join('scripts','auto-update.js')})}catch(_){return null}}var r=L(d);if(r)return r;var s=['everything-gemini-code','everything-gemini-code@everything-gemini-code','marketplaces/everything-gemini-code','ecc','ecc@ecc','marketplaces/ecc'];for(var i=0;i<s.length;i++){r=L(p.join(d,'plugins',s[i]));if(r)return r}try{var g=['everything-gemini-code','ecc'];for(var j=0;j<g.length;j++){var c=p.join(d,'plugins','cache',g[j]);var O=f.readdirSync(c);for(var k=0;k<O.length;k++){var q=p.join(c,O[k]);var V=f.readdirSync(q);for(var m=0;m<V.length;m++){r=L(p.join(q,V[m]));if(r)return r}}}}catch(_){}return d})();console.log(r)")}"
node "$EGC_ROOT/scripts/auto-update.js" --dry-run

# Update only Cursor-managed files in the current project
node "$EGC_ROOT/scripts/auto-update.js" --target cursor

# Override the EGC repo root explicitly
node "$EGC_ROOT/scripts/auto-update.js" --repo-root /path/to/everything-gemini-code
```

## Notes

- This command uses the recorded install-state request and reruns `install-apply.js` after pulling the latest repo changes.
- Reinstall is intentional: it handles upstream renames and deletions that `repair.js` cannot safely reconstruct from stale operations alone.
- Use `--dry-run` first if you want to see the reconstructed reinstall plan before mutating anything.
