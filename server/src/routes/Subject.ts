import { Response, Request, Router } from "express";
import { SubjectsView } from "../models/SubjectsView";
import { protect } from "../middleware/Auth";
import { ErrorInterface } from "../interface/AuthInterface";
import { SubjectInterfaceRequestBody } from "../interface/SubjectInterface";
import { SubjectModel } from "../models/Subject";
import { ObjectId } from "mongodb";
const errorMap: ErrorInterface = {};
export const Subject = Router();

/**
 * @method get
 * @protected Student, Admin
 * @description returns list of all subjects!
 * If used without req.query.id - it returns all subjects
 * If used with req.query.id - it will return concrete subject
 * @example
 * var axios = require('axios');
var data = JSON.stringify({});

var config = {
  method: 'get',
  url: 'http://localhost:5001/api/subjects',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjA0ZDVhNTU5ZGE3NDhlNzNmZWQwZiIsImlhdCI6MTY0MzQxMjIyNSwiZXhwIjoxNjQzNDE0MDI1fQ.aafOpTQO6p0c1wndO4qMsmW2PYg-hzY1Gj1btFGiWpw'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


====== OR WITH concrete ID - req.query.id

var axios = require('axios');
var data = JSON.stringify({});

var config = {
  method: 'get',
  url: 'http://localhost:5001/api/subjects?id=61f479fcb207f7b60263792f',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjA0ZDVhNTU5ZGE3NDhlNzNmZWQwZiIsImlhdCI6MTY0MzQxMjIyNSwiZXhwIjoxNjQzNDE0MDI1fQ.aafOpTQO6p0c1wndO4qMsmW2PYg-hzY1Gj1btFGiWpw'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
 */
Subject.get("/subjects", protect, async (req: Request, res: Response) => {
  if (req.query.id) {
    const subject = await SubjectsView.findOne({ _id: req.query.id });
    if (subject) {
      errorMap.err = "";
      return res.status(200).json({
        subject,
        errorMap,
        success: true,
      });
    }
    errorMap.err = "No subject was found";
    return res.status(404).json({
      errorMap,
      success: false,
    });
  } else {
    const subjects = await SubjectsView.find({});
    res.status(200).json({
      subjects,
      errorMap,
      success: true,
    });
  }
});

/**
 * @method post
 * @protected Admin
 * @description Updates whole subject
 * @example

var axios = require('axios');
var data = JSON.stringify({
  "subject": {
    "_id": "61f479fcb207f7b60263792f",
    "credits": 2,
    "degree": "Bc.",
    "forms": [
      "daily",
      "distant"
    ],
    "links": [
      "https://uuapp.plus4u.net/uu-bookkit-maing01/02b70dd1e0934ae197211deeecb95fdc/book/page?code=home"
    ],
    "severity": "compulsory",
    "topics": [
      "61893a8d94716d287be81b34",
      "61893a8d94716d287be81b35",
      "61893a8d94716d287be81b36",
      "61893a8d94716d287be81b37",
      "61893a8d94716d287be81b38"
    ],
    "tutors": [
      "618fdd05a56da0646da1f101"
    ],
    "languages": {
      "cs": {
        "name": "Jardův Totální subject 3 - final",
        "goal": "Cílem předmětu je dál rozvíjet jazykové dovednosti studentů na mírně pokročilé úrovni.",
        "description": "Cílem předmětu je dál rozvíjet jazykové dovednosti studentů na mírně pokročilé úrovni a seznamovat je s obecným i odborným jazykem potřebným pro komunikaci ve společenském a pracovním styku.",
        "langSeverity": "povinný",
        "langForm": [
          "denní",
          "dálková"
        ]
      },
      "en": {
        "name": "Jarda`s total subject 3 - fakin final",
        "goal": "The course aims at further development of students’ skills at the intermediate level.",
        "description": "The course aims at further development of students’ skills at the intermediate level and acquainting them with general and professional language necessary for communication in social and work situations.",
        "langSeverity": "compulsory",
        "langForm": [
          "daily",
          "distant"
        ]
      }
    }
  }
});

var config = {
  method: 'post',
  url: 'http://localhost:5001/api/subject/update',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjA0ZDVhNTU5ZGE3NDhlNzNmZWQwZiIsImlhdCI6MTY0MzQxMjQ5MCwiZXhwIjoxNjQzNDE0MjkwfQ.BdC0LpmOG-s70kmPwBb86HZ1aQlJtqrXB3uaZhszSpI'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
 */
Subject.post(
  "/subject/update",
  protect,
  async (req: Request, res: Response) => {
    const subjectToUpdate: SubjectInterfaceRequestBody = req.body.subject;
    const topicsObjectId = subjectToUpdate.topics.map((topic) => {
      return new ObjectId(topic);
    });

    const tutorsObjectId = subjectToUpdate.tutors.map((tutor) => {
      return new ObjectId(tutor);
    });

    try {
      const getSubjectBeforeUpdate = await SubjectModel.findByIdAndUpdate(
        subjectToUpdate._id,
        //@ts-ignore
        { ...subjectToUpdate, topics: topicsObjectId, tutors: tutorsObjectId },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      errorMap.err = "";
      res.status(200).json({
        errorMap,
        success: true,
        subject: getSubjectBeforeUpdate,
      });
    } catch (error) {
      if (error) {
        errorMap.err = error.message;
        res.status(500).json({
          success: false,
          errorMap,
          subject: subjectToUpdate,
        });
      }
    }
  }
);

/**
 * @method post
 * @protected Admin
 * @description Deletes whole subject
 * @example

 var axios = require('axios');
var data = JSON.stringify({
  "subject": {
    "_id": "61f479fcb207f7b60263792f"
  }
});

var config = {
  method: 'post',
  url: 'http://localhost:5001/api/subject/delete',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjA0ZDVhNTU5ZGE3NDhlNzNmZWQwZiIsImlhdCI6MTY0MzQxMTA0NSwiZXhwIjoxNjQzNDEyODQ1fQ.JvQbff7ru-QhHis_rUrNWcBeCBCY5xCbf8CLIi7NYHg'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
 * */
Subject.post(
  "/subject/delete",
  protect,
  async (req: Request, res: Response) => {
    const subjectToUpdate: SubjectInterfaceRequestBody = req.body.subject;
    try {
      const getSubjectTobeDeleted = await SubjectModel.findByIdAndDelete(
        subjectToUpdate._id
      );
      if (getSubjectTobeDeleted) {
        errorMap.err = "";
        res.status(200).json({
          errorMap,
          success: true,
          subject: getSubjectTobeDeleted,
        });
      } else {
        errorMap.err = "No such subject exist in our DB";
        res.status(401).json({
          errorMap,
          success: false,
          subject: getSubjectTobeDeleted,
        });
      }
    } catch (error) {
      if (error) {
        errorMap.err = error.message;
        res.status(500).json({
          success: false,
          errorMap,
          subject: subjectToUpdate,
        });
      }
    }
  }
);
/**
 * @method post
 * @protected Admin
 * @description Creates brand new subject
 * @example
 * 
 
var axios = require('axios');
var data = JSON.stringify({
  "subject": {
    "credits": 1,
    "degree": "Bc.",
    "forms": [
      "daily",
      "distant"
    ],
    "links": [
      "https://uuapp.plus4u.net/uu-bookkit-maing01/02b70dd1e0934ae197211deeecb95fdc/book/page?code=home"
    ],
    "severity": "compulsory",
    "topics": [
      "61893a8d94716d287be81b34",
      "61893a8d94716d287be81b35",
      "61893a8d94716d287be81b36",
      "61893a8d94716d287be81b37",
      "61893a8d94716d287be81b38"
    ],
    "tutors": [
      "618fdd05a56da0646da1f101"
    ],
    "languages": {
      "cs": {
        "name": "Jardův Nový Předmět",
        "goal": "Cílem předmětu je dál rozvíjet jazykové dovednosti studentů na mírně pokročilé úrovni.",
        "description": "Cílem předmětu je dál rozvíjet jazykové dovednosti studentů na mírně pokročilé úrovni a seznamovat je s obecným i odborným jazykem potřebným pro komunikaci ve společenském a pracovním styku.",
        "langSeverity": "povinný",
        "langForm": [
          "denní",
          "dálková"
        ]
      },
      "en": {
        "name": "Jarda`s new subject",
        "goal": "The course aims at further development of students’ skills at the intermediate level.",
        "description": "The course aims at further development of students’ skills at the intermediate level and acquainting them with general and professional language necessary for communication in social and work situations.",
        "langSeverity": "compulsory",
        "langForm": [
          "daily",
          "distant"
        ]
      }
    }
  }
});

var config = {
  method: 'post',
  url: 'http://localhost:5001/api/subject/create',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjA0ZDVhNTU5ZGE3NDhlNzNmZWQwZiIsImlhdCI6MTY0MzQxMTUyNywiZXhwIjoxNjQzNDEzMzI3fQ.FyCxAhBAyChEzI7UaCPHbuTty5OgwV4eMv93FUrzh9s'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


 * 
 * */

Subject.post(
  "/subject/create",
  protect,
  async (req: Request, res: Response) => {
    const subjectToBeCreated: SubjectInterfaceRequestBody = req.body.subject;
    const topicsObjectId = subjectToBeCreated.topics.map((topic) => {
      return new ObjectId(topic);
    });

    const tutorsObjectId = subjectToBeCreated.tutors.map((tutor) => {
      return new ObjectId(tutor);
    });
    try {
      const createdSubject = await SubjectModel.create({
        ...subjectToBeCreated,
        topics: topicsObjectId,
        tutors: tutorsObjectId,
      });
      if (createdSubject) {
        errorMap.err = "";
        res.status(200).json({
          errorMap,
          success: true,
          subject: createdSubject,
        });
      } else {
        errorMap.err = "The subject was not created!";
        res.status(401).json({
          errorMap,
          success: false,
          subject: subjectToBeCreated,
        });
      }
    } catch (error) {
      if (error) {
        errorMap.err = error.message;
        res.status(500).json({
          success: false,
          errorMap,
          subject: subjectToBeCreated,
        });
      }
    }
  }
);
