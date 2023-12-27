import requests
import json
import time

def open_file_with_books(): 
    books = []
    
    with open('data.txt', 'r') as file:
        for line in file:
            line = line.strip()

            if not line:
                continue

            parts = line.split(',')
            parts = [part.strip() for part in parts]
            
            book = {
                'title': parts[0],
                'author': parts[1],
                'isFinished': True if parts[2].lower() == 'true' else False,
            }
            
            books.append(book)
            
    return books

def send_graphql_mutation(books):
    url = 'http://localhost:8000/graphql'
    headers = {'Content-Type': 'application/json', 'x-api-key': ''}

    for book in books:
        mutation = """
        mutation {
            createBook(input: {title: "%s", author: "%s", isFinished: %s}) {
                book {
                    id
                    title
                    author
                    isFinished
                }
            }
        }
        """ % (book['title'], book['author'], book['isFinished'])

        body = {'query': mutation}
        
        response = requests.post(url, headers=headers, json=body)

        # Parse the response
        data = json.loads(response.text)

        # Print the response
        print("sent : ", data)
        time.sleep(2)

def main():
    books = open_file_with_books()
    
    print(books)

if __name__ == "__main__":
    main()