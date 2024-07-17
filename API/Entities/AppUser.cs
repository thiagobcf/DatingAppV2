﻿namespace API.Entities;

public class AppUser
{
  public int Id { get; set; }
  public required string UserName { get; set; }
  public  byte[] PasswordHash { get; set; } = [];
  public  byte[] PasswordSalt { get; set; } = [];
  public DateOnly DateOfBirth { get; set; }
  public required string KnownAs { get; set; }
  public DateTime Created { get; set; } = DateTime.UtcNow;    // dica: sql não tem a capacidade de usar datas em UtcNow => futuramente mudar para Postgres.
  public DateTime LastActive { get; set; } = DateTime.UtcNow;
  public required string Gender { get; set; }
  public string? Introduction { get; set; }                  // opcional.
  public string? Interests { get; set; }
  public string? LookingFor { get; set; }
  public required string City { get; set; }                 // obrigatorio.
  public required string Country { get; set; }
  public List<Photo> Photos { get; set; } = [];
}
