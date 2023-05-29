# pythonPlayground
Playground for python (Note that this server runs on 0.0.0.0 instead of localhost -- but will be accessible on localhost when running)

## Notes
After MacOS 12.4 python was removed from the command line. To reintroduce it (assuming you have x-code cli tools installed), you can run this command:
```
sudo ln -s /Library/Developer/CommandLineTools/usr/bin/python3 /Library/Developer/CommandLineTools/usr/bin/python
```
```
# running this command will show you if you have python tools installed or not
➜  ~ xcode-select --install
...
# if you have python tools installed you will see this
xcode-select: error: command line tools are already installed, use "Software Update" in System Settings to install updates
```
Also, make sure your python pip bin is on your path. I had to add mine like so:
```
export PATH=$PATH:$HOME/Library/Python/3.9/bin
```

## startup
```
pip install --no-cache-dir -r requirements.txt  
python main.py
```
-- or --  
```
docker build -t python-image .  
docker run -it -p 8080:8080 --rm --name python-playground python-image
```
