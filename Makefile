del:
	rm -rf .git
	git init
	git add .
	git commit -m'начал с нуля'
	git remote add origin git@github.com:vaeum/vaeum.github.io.git
	git push -u -f origin --all