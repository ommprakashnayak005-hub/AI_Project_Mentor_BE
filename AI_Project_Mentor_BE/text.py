import pyodbc

server = r"LAPTOP-AA3AKEDC\SQLEXPRESS"
database = "AIProjectMentor"

try:
    connection = pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        f"SERVER={server};"
        f"DATABASE={database};"
        "Trusted_Connection=yes;"
    )

    print("✅ SQL Server connection successful!")

    cursor = connection.cursor()
    cursor.execute("SELECT @@VERSION")

    result = cursor.fetchone()
    print("\nSQL Server Version:")
    print(result[0])

    connection.close()
    print("\nConnection closed successfully.")

except pyodbc.Error as e:
    print("❌ SQL Server connection failed!")
    print("Error:", e)