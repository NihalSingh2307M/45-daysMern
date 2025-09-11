function getGrade(score) {
  if (score >= 90 && score <= 100) {
      return "A";
  } else if (score >= 80) {
      return "B";
  } else if (score >= 70) {
      return "C";
  } else if (score >= 60) {
      return "D";
  } else if (score >= 0) {
      return "F";
  } else {
      return "Invalid Score";
  }
}

function checkGrade() {
  let score = document.getElementById("scoreInput").value;
  score = Number(score);
  let grade = getGrade(score);
  document.getElementById("result").textContent = "Grade: " + grade;
}
