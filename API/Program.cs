using System.Text;
using API;
using API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt => 
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddScoped<ITokenService, TokenService>();       // interface, implementação.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    var tokenKey = builder.Configuration["TokenKey"] ?? throw new Exception("TokenKey not found");
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuerSigningKey = true,
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
      ValidateIssuer = false,
      ValidateAudience = false
    };
  });

var app = builder.Build();

// Configure the HTTP request pipeline.
// middleware
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
  .WithOrigins("http://localhost:4200","https://localhost:4200"));

app.UseAuthentication();    // se authentica antes de autorizar.
app.UseAuthorization();

app.MapControllers();

app.Run();
