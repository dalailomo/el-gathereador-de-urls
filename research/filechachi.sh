#!/bin/bash

url=$1

fileName=$(echo "${url##*/}")
if [ -z "$fileName" ]
then
    fileNameToSave=$(echo "index.html")
else
    fileNameToSave=$(echo $fileName)
fi

echo $fileNameToSave;
