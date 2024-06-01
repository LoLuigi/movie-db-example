
jp_port=8888
jp_token="b44fba51-0d8c-437c-9dda-147632440239"

echo "Open Jupyter Lab on port $jp_port"
echo "Link: http://localhost:$jp_port/lab?token=$jp_token"
echo ""
echo "Your token is: $jp_token"
echo ""

jupyter lab --port="$jp_port" --no-browser --NotebookApp.token="$jp_token"