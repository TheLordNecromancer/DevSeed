# DevSeed — cómo publicar en lidis.usbcali.edu.co/devseed/

1. Subir esta carpeta a GitHub (GitHub Desktop → Commit → Push).
2. En la consola web del servidor:

       git clone https://github.com/TheLordNecromancer/DevSeed.git devseed
       cd devseed
       docker compose up -d

3. Esperar 30–60 s y abrir https://lidis.usbcali.edu.co/devseed/

Para actualizar después de cambios:

       cd ~/devseed && git pull && docker compose restart
