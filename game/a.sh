#!/bin/bash
(
linum=$(cat "$1" | grep GfxAuthor: -n | cut -f1 -d:)
cat "$1" | head -n $linum
./a.py > output
cat 'output'
tot=$(wc -l "$1" | cut -f1 -d' ')
minus=$(wc -l output | cut -f1 -d' ')
let tot=$tot-$minus-$linum
cat "$1" | tail -n $tot
) > temp
dasm temp -oa.bin -f3
rm temp
stella a.bin
