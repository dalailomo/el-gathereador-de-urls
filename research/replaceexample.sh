#!/bin/bash
firstString="I love Suzi and Marry"
secondString="Sara"
echo "${firstString/Suzi/"$secondString"}"
# prints 'I love Sara and Marry'
