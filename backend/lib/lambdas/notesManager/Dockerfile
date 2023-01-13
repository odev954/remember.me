FROM public.ecr.aws/lambda/nodejs:16

COPY package.json nest-cli.json tsconfig.build.json tsconfig.json src/ ${LAMBDA_TASK_ROOT}/

RUN npm i

RUN npm run build

CMD [ "dist/main.handler" ]