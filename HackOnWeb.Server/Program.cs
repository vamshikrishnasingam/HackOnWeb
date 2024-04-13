using HackOnWebService;
using HackOnWebRepo;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IHackathonService, HackathonService>();
builder.Services.AddScoped<IHackathonRepository, HackathonRepository>();

var configuration1 = builder.Configuration;

// Add services to the container.
builder.Services.AddSingleton<CosmosClient>((provider) =>
{
    var endpointUri = configuration1["CosmosDbSettings:EndpointUri"];
    var primaryKey = configuration1["CosmosDbSettings:PrimaryKey"];
    var databaseName = configuration1["CosmosDbSettings:DatabaseName"];
    var cosmosClientOptions = new CosmosClientOptions
    {
        ApplicationName = databaseName
    };
    var loggerFactory = LoggerFactory.Create(builder =>
    {
        builder.AddConsole();
    });
    var cosmosClient = new CosmosClient(endpointUri, primaryKey, cosmosClientOptions);
    cosmosClient.ClientOptions.ConnectionMode = ConnectionMode.Direct;
    return cosmosClient;
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure CORS
app.UseCors(builder =>
{
    builder.WithOrigins("*") // Update with your frontend origin URL
           .AllowAnyHeader()
           .AllowAnyMethod();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
