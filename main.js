function getFacebookID(document_root) {
    var html = '', node = document_root.head.firstChild,ids = Object(),
        vals = [], m = null, txts = null, i = '', v = 0, ti= 0, mi = 0;
    while (node) {
        // if it's in the head, this is the best place to get it.
        if (node.nodeType == Node.ELEMENT_NODE) {
            m = node.outerHTML.match(/content="fb:\/\/page\/\?id=(\d+)"/);
            if (m) {
                if (m[1] in ids) { ids[m[1]] = ids[m[1]] + 100;
                } else { ids[m[1]] = 100; } } }
        node = node.nextSibling;
    }
    if (ids.length == 0 || ids.length === undefined) {
        // Oh: we didn't find what we're looking for in the head. Look in the body.
        node = document_root.body.firstChild;
        while (node) {
            txts = [node.textContent, node.nodeValue, node.outerHTML, node.toString()];
            for (ti = 0; ti < txts.length; ti++) {
                if (txts[ti]) {
                    m = txts[ti].match(/(\d{12,})/g);
                    if (m) {
                        for (mi = 0; mi < m.length; mi++) {
                            if (m[mi] in ids) { ids[m[mi]] = ids[m[mi]] + 1;
                            } else { ids[m[mi]] = 1; }
                        }
                        break; } } }
            node = node.nextSibling;
        }
    }
    console.log(62, ids);
    if (Object.keys(ids).length > 0 ){
        for (v in ids) { //noinspection JSUnfilteredForInLoop
            vals.push([v, ids[v]]); }
        // sort by 1th element, reversed then return first
        vals = vals.sort(function(a, b) {return b[1] - a[1]});
        return vals[0][0];
    } else { return ":-( No FB Place ID"; }
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: getFacebookID(document)
});
