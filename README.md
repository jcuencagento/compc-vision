# Vision APIs Comparator Web
Página web para el Trabajo Fin de Grado de Javier Cuenca Gento en la UC3M.

**Build**   -> docker build . -t tfg-nextjs:latest

**Run**     -> docker run -v C:\Users\cuenc\OneDrive\Escritorio\Programacion\compc-vision\public\uploads:/app/public/uploads -v C:\Users\cuenc\OneDrive\Escritorio\Programacion\compc-vision\public\passwords:/app/public/passwords -p 3003:3003 --rm -it tfg-nextjs sh