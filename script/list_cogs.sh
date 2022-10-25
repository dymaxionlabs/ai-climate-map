#!/bin/bash
set -xe

aws s3 --profile ai-climate ls s3://aiclimate-raster-cogs/ --recursive
