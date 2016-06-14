fruit =['apples', 'orange', 'pear','apples', 'orange', 'pear', 'grape', 'kiwi']

#print fruit

#reporta the frequency of the every item in a list
def analyze_list(f):
        counts= {}
	for item in f:
		if item in counts:
#       counts[item]= counts[item]+1
                        counts[item] = counts[item] + 1
		else:
                        counts[item] =  1
	return counts

#let's analyze a list
counts = analyze_list(fruit) 
print counts
