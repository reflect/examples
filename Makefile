LAMBDA := aws lambda
FUNCTION_NAME := reflect-lambda-example
ROLE := arn:aws:iam::939261098792:role/ReflectLambda
RUNTIME := nodejs4.3
HANDLER := reflect.handler
ZIP_FILE := reflect-example.zip

zip:
	zip -r ${ZIP_FILE} reflect.js node_modules

create: zip
	${LAMBDA} create-function \
	--function-name ${FUNCTION_NAME} \
	--runtime ${RUNTIME} \
	--role ${ROLE} \
	--handler ${HANDLER} \
	--zip-file fileb://${ZIP_FILE}

update: zip
	${LAMBDA} update-function-code \
	--function-name ${FUNCTION_NAME} \
	--zip-file fileb://${ZIP_FILE}
