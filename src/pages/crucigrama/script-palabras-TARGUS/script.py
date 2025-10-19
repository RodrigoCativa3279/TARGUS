import json

FILAS = 15
COLUMNAS = 15

# Leer archivo de palabras
palabras = []
with open("palabras.txt", "r", encoding="utf-8") as f:
    for linea in f:
        if ":" in linea:
            palabra, pista = linea.strip().split(":", 1)
            palabras.append({"palabra": palabra.strip().upper(), "pista": pista.strip()})

grid = [["." for _ in range(COLUMNAS)] for _ in range(FILAS)]
horizontales = []
verticales = []

def puede_colocar_horizontal(palabra, x, y):
    if x + len(palabra) > COLUMNAS:
        return False
    for i, letra in enumerate(palabra):
        celda = grid[y][x+i]
        if celda != "." and celda != letra:
            return False
    return True

def puede_colocar_vertical(palabra, x, y):
    if y + len(palabra) > FILAS:
        return False
    for i, letra in enumerate(palabra):
        celda = grid[y+i][x]
        if celda != "." and celda != letra:
            return False
    return True

def colocar_horizontal(palabra_obj, x, y):
    palabra = palabra_obj["palabra"]
    for i, letra in enumerate(palabra):
        grid[y][x+i] = letra
    if x + len(palabra) < COLUMNAS:
        grid[y][x+len(palabra)] = "#"
    horizontales.append({"numero": len(horizontales)+1, "palabra": palabra, "x": x, "y": y, "pista": palabra_obj["pista"]})

def colocar_vertical(palabra_obj, x, y):
    palabra = palabra_obj["palabra"]
    for i, letra in enumerate(palabra):
        grid[y+i][x] = letra
    if y + len(palabra) < FILAS:
        grid[y+len(palabra)][x] = "#"
    verticales.append({"numero": len(verticales)+1, "palabra": palabra, "x": x, "y": y, "pista": palabra_obj["pista"]})

# Colocar la primera palabra horizontal en la fila 0
primera = palabras.pop(0)
colocar_horizontal(primera, 0, 0)

# Colocar palabras verticales que crucen con la primera
for i, letra in enumerate(primera["palabra"]):
    for pv in palabras[:]:
        if pv["palabra"].find(letra) != -1:
            idx_letra = pv["palabra"].index(letra)
            x = i
            y = 0 - idx_letra
            if 0 <= y <= FILAS - len(pv["palabra"]) and puede_colocar_vertical(pv["palabra"], x, y):
                colocar_vertical(pv, x, y)
                palabras.remove(pv)
                break

# Iterar por el resto de palabras horizontales y verticales
for ph in palabras[:]:
    colocado = False
    for y in range(FILAS):
        for x in range(COLUMNAS - len(ph["palabra"])):
            if puede_colocar_horizontal(ph["palabra"], x, y):
                # Verificar cruces
                intersecta = any(grid[y][x+i] != "." for i in range(len(ph["palabra"])))
                if intersecta or not horizontales:  # Debe cruzar algo o ser la primera horizontal
                    colocar_horizontal(ph, x, y)
                    palabras.remove(ph)
                    colocado = True
                    break
        if colocado:
            break

# Guardar JSON final
crucigrama = {
    "dificil": {
        "filas": FILAS,
        "columnas": COLUMNAS,
        "horizontales": horizontales,
        "verticales": verticales,
        "grid": grid
    }
}

with open("crucigrama_15x15.json", "w", encoding="utf-8") as f:
    json.dump(crucigrama, f, indent=2, ensure_ascii=False)

print("Crucigrama generado correctamente.")
