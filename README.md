# Intensivao-SoftComp
Repósitório para a preparação de ãmbiente para os cursos de python na UEPA

# Setting Up the workspace

1. Download VsCode (This Repo)
   
2. Download Obsidian (This Repo)

3. Download LaTex Compilator (Drive Folder)

4. Download Python (This Repo)

5. Add Extentions (I dont know)
   
   - Copy the 'extensions' folder into the '.vscode' folder. 

6. Add Libs

- Run the commands bellow to install the libs (This repo):

### Linux
``` shell
# Data Analysis
pip install ./libs/matplotlib-3.8.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl
pip install libs/pandas-2.1.3-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl
pip install libs/scipy-1.5.4-cp310-cp310-manylinux_2_1
pip install libs/numpy-1.20.2+mkl-cp310-cp310-win_amd
pip install ./libs/statistics-1.0.3.5.tar.gz 
pip install ./libs/numpy-1.26.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl 
pip install ./libs/plotly-5.18.0-py3-none-any.whl 

# NLP -> no need to execute.
pip install ./libs/scikit_learn-1.3.2-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl 
pip install ./libs/keras-2.15.0-py3-none-any.whl
pip install ./libs/tensorflow-2.15.0-cp310-cp310-manylinux_2_17_x86_64.manylinux2014_x86_64.whl 
pip install ./libs/graphviz-0.20.1-py3-none-any.whl 
pip install ./libs/pydot-1.4.2-py2.py3-none-any.whl 

```
### Windows
```shell
# Copy the 'libs' from Google Drive folder to the '.vscode' directory
copy D:\UEPA C:\Users\User\Desktop

# After installing Python and VSCode, run:
copy C:\Users\User\Desktop\UEPA\UEPA\libs
C:\Users\User\.vscode

# Run the 'list-files.py' script

cd C:\Users\User\Desktop\UEPA\UEPA

python list-files.py

# or
# C:\path\to\python.exe list-files.py

# After running the script, run the following command in the terminal:
cd .vscode\libs
pip install -r cd C:\Users\User\Desktop\UEPA\UEPA\requirements.txt
```

## 2. Drive Folder 

https://drive.google.com/drive/folders/1VYNCVjZ9PHbLWUo4t81N-uFvx-Dh_SnD
