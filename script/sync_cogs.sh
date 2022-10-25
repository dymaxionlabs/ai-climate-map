#!/bin/bash
set -xe
aws s3 --profile ai-climate sync images/cog/ s3://aiclimate-raster-cogs/ --exclude *.xml --delete
