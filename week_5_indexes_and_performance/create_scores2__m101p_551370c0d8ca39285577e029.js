db=db.getSiblingDB("school");
db.students.drop();
types = ['exam', 'quiz', 'homework', 'homework'];

for (i = 0; i < 10000; i++) {

    for (class_counter = 0; class_counter < 10; class_counter ++) {
	scores = []

	    for (j = 0; j < 4; j++) {
		scores.push({'type':types[j],'score':Math.random()*100});
	    }

	class_id = Math.floor(Math.random()*501);

	record = {'student_id':i, 'scores':scores, 'class_id':class_id};
	db.students.insert(record);

    }

}

