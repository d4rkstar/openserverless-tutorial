// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

//--web true
//--kind nodejs:default

function main(args) {
    let message = [];
    let errors = [];

    // validate the name
    if (args.name) {
        message.push("name: " + args.name)
    } else {
        errors.push("No name provided")
    }

    // validate the email
    var re = /\S+@\S+\.\S+/;
    if (args.email && re.test(args.email)) {
        message.push("email: " + args.email);
    } else {
        errors.push("Email missing or incorrect.");
    }

    // validate the phone
    if (args.phone && args.phone.match(/\d/g).length >= 10) {
        message.push("phone: " + args.phone);
    } else {
        errors.push("Phone number missing or incorrect.");
    }

    // validate the message
    if (args.message) {
        message.push("message:" + args.message);
    }

    // return the result
    if (errors.length) {
        var errs = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
        return {
            body: "<h1>Errors!</h1>" +
                errs + '<br><a href="javascript:window.history.back()">Back</a>'
        };
    } else {
        var data = "<pre>" + message.join("\n") + "</pre>";
        return {
            body: "<h1>Thank you!</h1>" + data,
            name: args.name,
            email: args.email,
            phone: args.phone,
            message: args.message
        };
    }
}
