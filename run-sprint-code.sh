SPRINT=$(cat src/sprint-code | tr "\n" " " | sed -e "s/  */ /g" -e "s/: */:/g")
node src/sprint.js "$SPRINT"
