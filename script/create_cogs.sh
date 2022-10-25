#!/bin/bash
set -xe

cd images/raw/
for f in $(find . -name '*.tif'); do
	dstdir=../cog/$(dirname $f)
	mkdir -p $dstdir
	rio cogeo create $f $dstdir/$(basename $f)
done
