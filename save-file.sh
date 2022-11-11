#!/bin/bash
url=$1
domain=$(echo "$url" | awk -F/ '{print $3}')
path=$(echo "$url" | awk -F${domain} '{print $2}')

fileName=$(echo "${url##*/}")
pathWithNoFileName=$(echo "${path/$fileName/}")

dirToSave=$(echo dumps/${domain}${pathWithNoFileName})
if [ -z "$fileName" ]
then
    fileNameToSave=$(echo "index.html")
else
    fileNameToSave=$(echo $fileName)
fi

echo $dirToSave$fileNameToSave

# mkdir -p $dirToSave
# # curl $url > $dirToSave/$fileNameToSave
# echo $dirToSave/$fileNameToSave
# echo $fileNameToSave
