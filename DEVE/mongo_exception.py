
import sys
import pymongo

connection = pymongo.MongoClient("mongodb://localhost")

db = connection.mytest
users = db.users

doc = {'firstname':'Andrew', 'lastname':'Erlichson'}
print doc
print "about to insert the document"

try:
    users.insert_one(doc)
except Exception as e:
    print "insert failed:", e

print doc
print "inserting again"
doc = {'firstname':'Andrew', 'lastname':'Erlichson'}

try:
    users.insert_one(doc)
except Exception as e:
    print "second insert failed:", e

print doc

