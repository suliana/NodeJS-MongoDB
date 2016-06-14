import bottle

@bottle.route('/')
def home_page():
    mythings = ['apple', 'orange', 'banana', 'peach']
    # return bottle.template('hello_world', username='Andrew', things=mythings)
    return bottle.template('hello_world', {'username':"Richard", 'things':mythings})
    #return "Hello World!"
#@bottle.route('/testpage')
#def test_page():
#	return "ths is a test pagr"

@bottle.post('/')
def favorite_fruit():
    fruit = bottle.request.forms.get("fruit")
    if (fruit == None or fruit == ""):
        fruit="No fruit selected"

    return bottle.template('fruit_selection.tpl', {'fruit': fruit})


bottle.debug(True)
#bottle.run(host='localhost', port=7777)
bottle.run(host='localhost', port=8080)
