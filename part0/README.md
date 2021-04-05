0.4: New Note

Browser->Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
note over Browser:
In a post request, the data submitted in the form is sent 
end note

Server-->Browser: HTML-Code
note over Server:
The server then receives the data, handles it to 
make a new note pushing the object into a json 
"data.json" and sends the HTTP Status Code 302 to 
tell the browser to refresh.
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
note over Browser:
The browser receives the status code and 
asks the server for the HTML-Code 
end note
Server-->Browser: HTML-Code
note over Server:
The server receives the request and sends 
the HTML Code to the Browser to load
end note

note over Browser,Server: Refresh

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
note over Browser:
The browser asks the server for the "main.css" file
included in the html Code with a "GET" Request
end note
Server-->Browser: main.css
note over Server:
The server then receives the request and sends the 
"main.css" file with the status code "200" included.
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
note over Browser:
The browser asks the server for the "main.js" file
included in the html Code with a "GET" Request
end note
Server-->Browser: main.js
note over Server:
The server then receives the request and sends 
the "main.js" file with the status code "200" included.
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
note over Browser:
The browser asks the server for the "data.json" 
file from the javascript "main.js" script
end note
Server-->Browser: [{ content: "HTML on helppoa", date: "2019-01-01" }, ...]
note over Server:
The server then receives the request and sends the "data.json" file
the status code "200" included.
end note


0.5 Single Page App

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
note over Browser:
In requests the HTML Code 
with a "GET" Method 
end note

Server-->Browser: HTML-Code
note over Server:
The server then receives request, and sends the 
HTML Code in response with a "200" STATUS CODE
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
note over Browser:
The browser asks the server for the "main.css" file
included in the html Code with a "GET" Request
end note
Server-->Browser: main.css
note over Server:
The server then receives the request and sends the 
"main.css" file with the status code "200" included.
end note


Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
note over Browser:
The browser asks the server for the "spa.js" file
included in the html Code with a "GET" Request
end note
Server-->Browser: main.js
note over Server:
The server then receives the request and sends 
the "spa.js" file with the status code "200" included.
end note

Browser->Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
note over Browser:
The browser asks the server for the "data.json" 
file from the javascript "spa.js" script
end note
Server-->Browser: [{ content: "HTML on helppoa", date: "2019-01-01" }, ...]
note over Server:
The server then receives the request and sends the "data.json" file
the status code "200" included.
end note


Browser->Server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
note over Browser:
The browser asks the server for the "favicon.ico"
end note
Server-->Browser: favicon.ico
note over Server:
The server then receives the request 
and sends the file to the browser
end note

0.6 new note

note over Browser:
After the button save is pressed, the e.preventDefault()
method prevents the browser from  submitting the form and
reloading
end note

note over Browser:
Then, the input text of the new note is pushed to 
the end of the array "notes" and the redraw()Notes
method is called to show it on the bottom of the list
end note

Browser->Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
note over Browser:
After that, the sendToServer() method pushes the note data
to the server in a JSON format
end note

Server-->Browser: Response
note over Server:
The server then receives request, and sends the 
the response with a "201" STATUS CODE
end note
