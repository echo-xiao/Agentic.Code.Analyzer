#!/bin/zsh
# 逐题对比 v35 与新报告：正节点 / 材料 / token
new=$(ls -t runs/*.md | head -1)
extract() {
  awk -F'|' '/^\| 题号/{t=1;next} t&&/^\|---/{next} t&&!/^\|/{t=0} t&&$2!="" {
    gsub(/^ +| +$/,"",$2); gsub(/ /,"",$4); gsub(/ /,"",$5); gsub(/ /,"",$6);
    print $2 "\t" $4 "\t" $5 "\t" $6 }' "$1"
}
extract runs/2026-08-10-report-v35.md > /tmp/a.tsv
extract "$new" > /tmp/b.tsv
echo "对比: $(basename $new) vs v35"
printf "%-28s %9s %9s %9s\n" "题号" "正节点" "材料" "token"
join -t$'\t' -a1 <(sort /tmp/a.tsv) <(sort /tmp/b.tsv) 2>/dev/null | \
awk -F'\t' '{printf "%-28s %4s→%-4s %4s→%-4s %6s→%-6s\n", $1, $2, $5, $3, $6, $4, $7}'
