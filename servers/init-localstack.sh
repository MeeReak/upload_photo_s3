#!/bin/bash
set -x
awslocal s3 mb s3://local-bucket
awslocal s3api put-bucket-acl --bucket local-bucket --acl private
set

#to check image 
aws --endpoint-url=http://127.0.0.1:4566 s3 ls s3://local-bucket --recursive