import {gql} from '@apollo/client';

export const GET_STUDENT_REPORTS = gql`
  query StudentReports($studentId: ID!) {
    studentReports(studentId: $studentId) {
      id
      brandId
      hakwonId
      studentId
      name
      profileCharacter
      age
      curriculumName
      classroomName
      weekday
      sendDate
      reportProgress {
        bookName
        chapterNumber
        numOfChapters
      }
      textLife
      textLesson
      textToParents
      createdAt
    }
  }
`;
