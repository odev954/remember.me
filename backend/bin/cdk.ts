#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import AppStack from "../lib/appStack";

const app = new cdk.App();
new AppStack(app, "RememberMeStack");
