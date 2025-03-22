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

//--param NOTIFICATION_URL $NOTIFICATION_URL

function main(args) {
    const { name, email, phone, message } = args;

    const subject = `New contact request from Apache OpenServerless`;
    const payload = {
        subject,
        name,
        email,
        phone,
        message,
    };

    console.log("Built message", payload);

    return fetch(args.NOTIFICATION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (!response.ok) {
                console.log("Error sending message. Status code:", response.status);
            } else {
                console.log("Message sent successfully");
            }
            return {
                body: args.body,
            };
        })
        .catch(error => {
            console.log("Error sending message", error);
            return {
                body: error,
            };
        });
}
